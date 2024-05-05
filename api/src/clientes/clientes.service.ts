import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { NOME_VAZIO, CNPJ_EXISTENTE, CNPJ_NAO_NUMEROS, NENHUM_CLIENTE_ENCONTRADO } from '../erros/erros';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(
    nome: string,
    email?: string,
    telefone?: string,
    cnpj?: string,
  ): Promise<Cliente> {
    if (!nome) {
      throw new Error(NOME_VAZIO);
    }

    const cnpjContemApenasNumeros = /^\d+$/.test(cnpj || '');

    if (cnpj && !cnpjContemApenasNumeros) {
      throw new Error(CNPJ_NAO_NUMEROS);
    }

    const clienteCadastrado = await this.clienteRepository.findOne({
      where: { cnpj },
    });

    if (clienteCadastrado && clienteCadastrado.cnpj !== null) {
      throw new Error(CNPJ_EXISTENTE);
    }

    const novoCliente = this.clienteRepository.create({
      nome,
      email,
      telefone,
      cnpj,
    });

    return this.clienteRepository.save(novoCliente);
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteRepository.find();

    if (clientes.length === 0) {
      throw new Error(NENHUM_CLIENTE_ENCONTRADO);
    }

    return clientes;
  }

  async findOne(id: string): Promise<Cliente> {
    return this.clienteRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    await this.clienteRepository.update(id, updateClienteDto);
    return this.clienteRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
