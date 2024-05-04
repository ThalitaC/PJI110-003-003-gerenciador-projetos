import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { UpdateClienteDto } from './dto/update-cliente.dto';

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
    const clienteCadastrado = await this.clienteRepository.findOne({
      where: { cnpj },
    });

    if (clienteCadastrado && clienteCadastrado.cnpj != null) {
      throw new Error('CNPJ já cadastrado');
    }

    const novoCliente = this.clienteRepository.create({
      nome,
      email,
      telefone,
      cnpj,
    });

    return await this.clienteRepository.save(novoCliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
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
