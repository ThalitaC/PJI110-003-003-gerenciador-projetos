import { Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Injectable()
export class TarefasService {
  create(createTarefaDto: CreateTarefaDto) {
    return 'This action adds a new tarefa';
  }

  findAll() {
    return `This action returns all tarefas`;
  }

  findOne(id: string) {
    return `This action returns a #${id} tarefa`;
  }

  findAllByProjetoId(projetoId: string) {
    return `This action returns all tarefas by projetoId ${projetoId}`;
  }

  update(id: string, updateTarefaDto: UpdateTarefaDto) {
    return `This action updates a #${id} tarefa`;
  }

  remove(id: string) {
    return `This action removes a #${id} tarefa`;
  }
}
