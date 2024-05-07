import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import {
  CLIENTE_NAO_ENCONTRADO,
  CNPJ_EXISTENTE,
  CNPJ_NAO_NUMEROS,
  ID_INVALIDO,
  NENHUM_CLIENTE_ENCONTRADO,
  NOME_VAZIO,
} from '../erros/erros';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(novoCliente: CreateClienteDto): Promise<Cliente> {
    await this.validaNomeCNPJ(novoCliente.nome, novoCliente.cnpj);

    const cliente = this.clienteRepository.create(novoCliente);

    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteRepository.find();

    if (clientes.length === 0) {
      throw new Error(NENHUM_CLIENTE_ENCONTRADO);
    }

    return clientes;
  }

  async findOne(id: string): Promise<Cliente> {
    await this.validaID(id);

    await this.validaClienteExiste(id);
    return await this.clienteRepository.findOne({ where: { id } });
  }

  async update(data: {
    id: string;
    nome?: string;
    email?: string;
    telefone?: string;
    cnpj?: string;
  }): Promise<Cliente> {
    const { id, nome, email, telefone, cnpj } = data;
    await this.validaID(id);
    await this.validaClienteExiste(id);
    await this.validaNomeCNPJ(nome, cnpj);

    await this.clienteRepository.update(
      { id },
      { nome, email, telefone, cnpj },
    );

    return await this.clienteRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    try {
      await this.validaClienteExiste(id);
      await this.validaID(id);
      await this.clienteRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async validaClienteExiste(id: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    });
    if (!cliente) {
      throw new Error(CLIENTE_NAO_ENCONTRADO);
    }
  }

  private async validaID(id: string) {
    const idUuid = id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );

    if (!idUuid) {
      throw new Error(ID_INVALIDO);
    }
  }

  private async validaNomeCNPJ(nome: string, cnpj: string) {
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
  }
}
