import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import {
  NOME_VAZIO,
  CNPJ_EXISTENTE,
  CNPJ_NAO_NUMEROS,
  ERRO_CRIACAO,
  NENHUM_CLIENTE_ENCONTRADO,
  CLIENTE_NAO_ENCONTRADO,
  ID_INVALIDO,
} from '../erros/erros';
import { Response } from 'express';
import { ClientesService } from './clientes.service';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(
    @Query() queryParams: CreateClienteDto,
    @Res() res?: Response,
  ): Promise<Cliente> {
    try {
      const novoCliente = await this.clientesService.create(queryParams);
      res.status(201).json(novoCliente);
      return novoCliente;
    } catch (error) {
      const errorMessages = {
        [NOME_VAZIO]: 400,
        [CNPJ_EXISTENTE]: 409,
        [CNPJ_NAO_NUMEROS]: 400,
        [ERRO_CRIACAO]: 500,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get()
  async findAll(@Res() res?: Response) {
    try {
      const todosClientes = await this.clientesService.findAll();
      res.status(201).json(todosClientes);
      return todosClientes;
    } catch (error) {
      const errorMessages = {
        [NENHUM_CLIENTE_ENCONTRADO]: 404,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Query('id') id: string, @Res() res?: Response) {
    try {
      const cliente = await this.clientesService.findOne(id);
      res.status(200).json(cliente);
      return cliente;
    } catch (error) {
      const errorMessages = {
        [CLIENTE_NAO_ENCONTRADO]: 404,
        [ID_INVALIDO]: 400,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Query() queryParams: UpdateClienteDto,
    @Res() res?: Response,
  ): Promise<Cliente> {
    try {
      const { id = '' } = queryParams;
      const cliente = await this.clientesService.update({ id, ...queryParams });
      res.status(200).json(cliente);
      return cliente;
    } catch (error) {
      const errorMessages = {
        [CLIENTE_NAO_ENCONTRADO]: 404,
        [ID_INVALIDO]: 400,
        [NOME_VAZIO]: 400,
        [CNPJ_EXISTENTE]: 409,
        [CNPJ_NAO_NUMEROS]: 400,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Query('id') id: string, @Res() res?: Response) {
    try {
      await this.clientesService.delete(id);
      res.status(204).json();
    } catch (error) {
      const errorMessages = {
        [CLIENTE_NAO_ENCONTRADO]: 404,
        [ID_INVALIDO]: 400,
      };
      const statusCode = errorMessages[error.message] || 500;
      res.status(statusCode).json({ error: error.message });
      throw error;
    }
  }
}
