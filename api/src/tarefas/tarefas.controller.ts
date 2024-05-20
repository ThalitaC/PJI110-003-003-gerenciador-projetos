import { Controller, Delete, Get, Patch, Post, Query, Res } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { Response } from 'express';
import { ID_INVALIDO, NENHUMA_TAREFA_ENCONTRADA, NOME_VAZIO, PROJETO_NAO_ENCONTRADO } from '../erros/erros';
import { Tarefa } from './entities/tarefa.entity';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

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
        [ID_INVALIDO]: 400,
        [PROJETO_NAO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get()
  async findAll(@Res() res?: Response) {
    try {
      const todasTarefas = await this.tarefasService.findAll();
      res.status(201).json(todasTarefas);
      return todasTarefas;
    } catch (error) {
      const errorMessages = {
        [NENHUMA_TAREFA_ENCONTRADA]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get()
  async findOne(@Query('id') id: string, @Res() res?: Response) {
    try {
      const tarefa = await this.tarefasService.findOne(id);
      res.status(200).json(tarefa);
      return tarefa;
    } catch (error) {
      const errorMessages = {
        [NENHUMA_TAREFA_ENCONTRADA]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get('projeto')
  async findAllByProjeto(
    @Query('id') id: string,
    @Res() res?: Response,
  ): Promise<Tarefa[]> {
    try {
      const tarefas = await this.tarefasService.findAllByProjeto(id);
      res.status(200).json(tarefas);
      return tarefas;
    } catch (error) {
      const errorMessages = {
        [NENHUMA_TAREFA_ENCONTRADA]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Patch('/update')
  async update(
    @Query() queryParams: UpdateTarefaDto,
    @Res() res?: Response): Promise<Tarefa> {
    try {
      const { id = '' } = queryParams;
      const tarefa = await this.tarefasService.update({ id, ...queryParams });
      res.status(200).json(tarefa);
      return tarefa;
    } catch (error) {
      const errorMessages = {
        [NOME_VAZIO]: 400,
        [ID_INVALIDO]: 400,
        [PROJETO_NAO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Delete('/delete')
  async delete(@Query('id') id: string, @Res() res?: Response) {
    try {
      await this.tarefasService.delete(id);
      res.status(204).json();
    } catch (error) {
      const errorMessages = {
        [NENHUMA_TAREFA_ENCONTRADA]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }
}
