import { Controller, Post, Query, Res } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { Response } from 'express';
import { Projeto } from './entities/projeto.entity';
import { CLIENTE_NAO_ENCONTRADO, CLIENTE_OBRIGATORIO, ID_INVALIDO, NOME_VAZIO } from '../erros/erros';

@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Post()
  async create(
    @Query() queryParams: CreateProjetoDto,
    @Res() res?: Response,
  ): Promise<Projeto> {
    try {
      const novoProjeto = await this.projetosService.create(queryParams);
      res.status(201).json(novoProjeto);
      return novoProjeto;
    } catch (error) {
      const errorMessages = {
        [NOME_VAZIO]: 400,
        [CLIENTE_OBRIGATORIO]: 400,
        [ID_INVALIDO]: 400,
        [CLIENTE_NAO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }
}
