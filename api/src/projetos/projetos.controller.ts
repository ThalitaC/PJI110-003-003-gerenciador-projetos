import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { Response } from 'express';
import { Projeto } from './entities/projeto.entity';
import {
  CLIENTE_NAO_ENCONTRADO,
  CLIENTE_VAZIO,
  ID_INVALIDO,
  NENHUM_PROJETO_ENCONTRADO,
  NOME_VAZIO,
  PROJETO_NAO_ENCONTRADO,
} from '../erros/erros';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('projetos')
@ApiTags('projetos')
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
        [CLIENTE_VAZIO]: 400,
        [ID_INVALIDO]: 400,
        [CLIENTE_NAO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get()
  async findAll(@Res() res?: Response) {
    try {
      const todosProjetos = await this.projetosService.findAll();
      res.status(201).json(todosProjetos);
      return todosProjetos;
    } catch (error) {
      const errorMessages = {
        [NENHUM_PROJETO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get()
  async findOne(@Query('id') id: string, @Res() res?: Response) {
    try {
      const projeto = await this.projetosService.findOne(id);
      res.status(200).json(projeto);
      return projeto;
    } catch (error) {
      const errorMessages = {
        [PROJETO_NAO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get('cliente')
  async findAllByCliente(
    @Query('id') id: string,
    @Res() res: Response,
  ): Promise<Projeto[]> {
    try {
      const projetos = await this.projetosService.findAllByCliente(id);
      res.status(200).json(projetos);
      return projetos;
    } catch (error) {
      const errorMessages = {
        [CLIENTE_NAO_ENCONTRADO]: 404,
        [NENHUM_PROJETO_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Patch('/update')
  async update(
    @Query() queryParams: UpdateProjetoDto,
    @Res() res?: Response,
  ): Promise<Projeto> {
    try {
      const { id = '' } = queryParams;
      const projeto = await this.projetosService.update({ id, ...queryParams });
      res.status(200).json(projeto);
      return projeto;
    } catch (error) {
      const errorMessages = {
        [CLIENTE_NAO_ENCONTRADO]: 404,
        [ID_INVALIDO]: 400,
        [NOME_VAZIO]: 400,
        [CLIENTE_VAZIO]: 400,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Delete('/delete')
  async remove(@Query('id') id: string, @Res() res?: Response) {
    try {
      await this.projetosService.delete(id);
      res.status(204).json();
    } catch (error) {
      const errorMessages = {
        [PROJETO_NAO_ENCONTRADO]: 404,
        [ID_INVALIDO]: 400,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }
}
