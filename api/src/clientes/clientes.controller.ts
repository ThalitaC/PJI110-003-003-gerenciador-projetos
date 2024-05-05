import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import {
  NOME_VAZIO,
  CNPJ_EXISTENTE,
  CNPJ_NAO_NUMEROS,
  ERRO_CRIACAO,
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
      const { nome = '', email = '', telefone = '', cnpj = '' } = queryParams;
      const novoCliente = await this.clientesService.create(
        nome,
        email || null,
        telefone || null,
        cnpj || null,
      );
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
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }
}
