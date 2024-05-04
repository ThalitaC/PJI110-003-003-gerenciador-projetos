import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const clienteCadastrado = await this.clienteRepository.findOne({
      where: { cnpj: createClienteDto.cnpj },
    });

    if (clienteCadastrado) {
      throw new Error('CNPJ já cadastrado');
    }

    const novoCliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(novoCliente);
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
