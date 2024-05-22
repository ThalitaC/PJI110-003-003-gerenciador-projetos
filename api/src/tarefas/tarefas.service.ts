import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { ProjetosService } from '../projetos/projetos.service';
import {
  ID_INVALIDO,
  NENHUMA_TAREFA_ENCONTRADA,
  NOME_VAZIO,
  PROJETO_NAO_ENCONTRADO,
} from '../erros/erros';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private tarefaRepository: Repository<Tarefa>,
    @Inject(forwardRef(() => ProjetosService))
    private projetosService: ProjetosService,
  ) {}

  async create(novaTarefa: CreateTarefaDto): Promise<Tarefa> {
    await this.validaNome(novaTarefa.nome);
    await this.projetosService.validaID(novaTarefa.projetoId);
    await this.projetosService.validaProjetoExiste(novaTarefa.projetoId);

    const tarefa: DeepPartial<Tarefa> = {
      ...novaTarefa,
      projeto: await this.projetosService.findOne(novaTarefa.projetoId),
    };

    return await this.tarefaRepository.save(tarefa);
  }

  async findAll(): Promise<Tarefa[]> {
    const tarefas = await this.tarefaRepository
      .createQueryBuilder('tarefa')
      .leftJoinAndSelect('tarefa.projeto', 'projeto')
      .leftJoinAndSelect('projeto.cliente', 'cliente')
      .getMany();

    if (tarefas.length === 0) {
      throw new Error(NENHUMA_TAREFA_ENCONTRADA);
    }
    return tarefas;
  }

  async findOne(id: string): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository
      .createQueryBuilder('tarefa')
      .leftJoinAndSelect('tarefa.projeto', 'projeto')
      .where('tarefa.id = :id', { id })
      .leftJoinAndSelect('projeto.cliente', 'cliente')
      .getOne();

    if (!tarefa) {
      throw new Error(NENHUMA_TAREFA_ENCONTRADA);
    }

    return tarefa;
  }

  async findAllByProjeto(id: string): Promise<Tarefa[]> {
    const projeto = await this.projetosService.findOne(id);
    if (!projeto) {
      throw new Error(PROJETO_NAO_ENCONTRADO);
    }

    const tarefas = await this.tarefaRepository
      .createQueryBuilder('tarefa')
      .leftJoinAndSelect('tarefa.projeto', 'projeto')
      .where('projeto.id = :id', { id })
      .getMany();

    if (tarefas.length === 0) {
      throw new Error(NENHUMA_TAREFA_ENCONTRADA);
    }
    return tarefas;
  }

  async update(tarefa: UpdateTarefaDto): Promise<Tarefa> {
    if (tarefa.nome !== undefined) {
      await this.validaNome(tarefa.nome);
    }
    if (tarefa.projetoId !== undefined) {
      await this.projetosService.validaID(tarefa.projetoId);
      await this.projetosService.validaProjetoExiste(tarefa.projetoId);
    }

    const tarefaAtualizada = {
      ...tarefa,
      ...(tarefa.projetoId && {
        projeto: await this.projetosService.findOne(tarefa.projetoId),
      }),
    };

    await this.tarefaRepository.update({ id: tarefa.id }, tarefaAtualizada);

    return await this.findOne(tarefa.id);
  }

  async delete(id: string) {
    try {
      await this.validaID(id);
      await this.validaTarefaExiste(id);
      await this.tarefaRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  private async validaNome(nome: string) {
    if (!nome) {
      throw new Error(NOME_VAZIO);
    }
  }

  private async validaID(id: string) {
    const idUuid = id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    if (!idUuid) {
      throw new Error(ID_INVALIDO);
    }
  }

  private async validaTarefaExiste(id: string) {
    const tarefa = await this.tarefaRepository.findOne({
      where: { id },
    });
    if (!tarefa) {
      throw new Error(NENHUMA_TAREFA_ENCONTRADA);
    }
  }
}
