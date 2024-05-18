import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { ProjetosService } from '../projetos/projetos.service';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private tarefaRepository: Repository<Tarefa>,
    @Inject(forwardRef(() => ProjetosService))
    private projetosService: ProjetosService,
  ) {}

  async create(novaTarefa: CreateTarefaDto): Promise<Tarefa> {
    const tarefa: DeepPartial<Tarefa> = {
      ...novaTarefa,
      projeto: await this.projetosService.findOne(novaTarefa.projetoId),
    };

    const savedTarefa = await this.tarefaRepository.save(tarefa);
    return savedTarefa;
  }
}
