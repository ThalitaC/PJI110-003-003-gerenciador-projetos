import { Injectable } from '@nestjs/common';
import { Projeto } from './entities/projeto.entity';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import {
  CLIENTE_NAO_ENCONTRADO,
  CLIENTE_OBRIGATORIO,
  ID_INVALIDO,
  NENHUM_PROJETO_ENCONTRADO,
  NOME_VAZIO,
  PROJETO_NAO_ENCONTRADO,
} from '../erros/erros';
import { ClientesService } from '../clientes/clientes.service';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(Projeto) private projetoRepository: Repository<Projeto>,
    private clientesService: ClientesService,
  ) {}

  async create(novoProjeto: CreateProjetoDto): Promise<Projeto> {
    await this.validaNome(novoProjeto.nome);
    await this.validaCliente(novoProjeto.cliente);

    const projeto: DeepPartial<Projeto> = {
      ...novoProjeto,
      cliente: await this.clientesService.findOne(novoProjeto.cliente),
    };

    return await this.projetoRepository.save(projeto);
  }

  async findAll(): Promise<Projeto[]> {
    const projetos = await this.projetoRepository
      .createQueryBuilder('projeto')
      .leftJoinAndSelect('projeto.cliente', 'cliente')
      .getMany();

    if (projetos.length === 0) {
      throw new Error(NENHUM_PROJETO_ENCONTRADO);
    }

    return projetos;
  }

  async findOne(id: string): Promise<Projeto> {
    const projeto = await this.projetoRepository
      .createQueryBuilder('projeto')
      .leftJoinAndSelect('projeto.cliente', 'cliente')
      .where('projeto.id = :id', { id })
      .getOne();

    if (!projeto) {
      throw new Error(PROJETO_NAO_ENCONTRADO);
    }

    return projeto;
  }

  async update(projeto: UpdateProjetoDto): Promise<Projeto> {
    await this.validaNome(projeto.nome);

    const projetoAtualizado = {
      ...projeto,
      ...(projeto.cliente && {
        cliente: await this.clientesService.findOne(projeto.cliente),
      }),
    };

    await this.projetoRepository.update({ id: projeto.id }, projetoAtualizado);

    return await this.findOne(projeto.id);
  }

  private async validaNome(nome: string) {
    if (!nome) {
      throw new Error(NOME_VAZIO);
    }
  }

  private async validaCliente(id: string) {
    if (!id) {
      throw new Error(CLIENTE_OBRIGATORIO);
    }

    const idUuid = id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    if (!idUuid) {
      throw new Error(ID_INVALIDO);
    }

    const cliente = await this.clientesService.findOne(id);

    if (!cliente) {
      throw new Error(CLIENTE_NAO_ENCONTRADO);
    }
  }
}
