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
        email || '',
        telefone || '',
        cnpj || '',
      );
      res.status(201).json(novoCliente);
      return novoCliente;
    } catch (error) {
      if (error.message === 'Nome não pode ser vazio') {
        res.status(400).json({ error: 'Nome não pode ser vazio' });
      } else if (error.message === 'CNPJ já cadastrado') {
        res.status(409).json({ error: 'CNPJ já cadastrado' });
      } else if (error.message === 'CNPJ pode conter apenas números') {
        res.status(400).json({ error: 'CNPJ pode conter apenas números' });
      } else {
        res.status(500).json({ error: 'Erro ao criar cliente' });
      }
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
