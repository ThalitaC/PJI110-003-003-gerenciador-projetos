import { Controller, Post, Query, Res } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { Response } from 'express';
import { NOME_VAZIO } from '../erros/erros';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  async create(@Query() queryParams: CreateTarefaDto, @Res() res?: Response) {
    try {
      const novaTarefa = await this.tarefasService.create(queryParams);
      res.status(201).json(novaTarefa);
      return novaTarefa;
    } catch (error) {
      const errorMessages = {
        [NOME_VAZIO]: 400,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }
}
