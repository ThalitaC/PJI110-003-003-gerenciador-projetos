import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
import { ProjetosService } from '../projetos/projetos.service';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @Inject(forwardRef(() => ProjetosService))
    private projetosService: ProjetosService,
  ) {}

  async create(novoCliente: CreateClienteDto): Promise<Cliente> {
    if (novoCliente.cnpj == '') {
      novoCliente.cnpj = undefined;
    }
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

  async update(cliente: {
    id: string;
    nome?: string;
    email?: string;
    telefone?: string;
    cnpj?: string;
  }): Promise<Cliente> {
    const { id, nome, email, telefone, cnpj } = cliente;
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

  async delete(id: string): Promise<void> {
    try {
      await this.validaID(id);
      await this.validaClienteExiste(id);

      const projetos = await this.projetosService.findAllByCliente(id);

      for (const project of projetos) {
        await this.projetosService.delete(project.id);
      }
      await this.clienteRepository.delete(id);
    } catch (error) {
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

    if (cnpj !== undefined) {
      const clienteCadastrado = await this.clienteRepository.findOne({
        where: { cnpj },
      });
      if (clienteCadastrado) {
        throw new Error(CNPJ_EXISTENTE);
      }
    }
  }
}
