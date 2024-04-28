import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClientesService', () => {
  let clientesService: ClientesService;
  let clienteRepository: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getRepositoryToken(Cliente),
          useClass: Repository,
        },
      ],
    }).compile();

    clientesService = module.get<ClientesService>(ClientesService);
    clienteRepository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  describe('create', () => {
    let createClienteDto: CreateClienteDto;

    beforeEach(() => {
      createClienteDto = {
        id: '1',
        nome: 'Teste Cliente',
        email: 'teste@exemplo.com',
        telefone: '1234567890',
        cnpj: '12345678901234',
      };
    });

    it('deve criar um novo cliente com sucesso', async () => {
      jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(clienteRepository, 'create').mockReturnValue(createClienteDto);
      jest.spyOn(clienteRepository, 'save').mockResolvedValue(createClienteDto);

      expect(clienteRepository.create).not.toHaveBeenCalled();
      expect(clienteRepository.save).not.toHaveBeenCalled();

      const result = await clientesService.create(createClienteDto);

      expect(clienteRepository.create).toHaveBeenCalledWith(createClienteDto);
      expect(clienteRepository.save).toHaveBeenCalledWith(createClienteDto);
      expect(result).toEqual(createClienteDto);
    });

    it('deve lançar um erro se um cliente com o mesmo CNPJ já existir', async () => {
      const existingCliente = {
        id: '2',
        nome: 'Cliente Existente',
        email: 'existente@exemplo.com',
        telefone: '0987654321',
        cnpj: '12345678901234',
      };

      jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(existingCliente);

      await expect(clientesService.create(createClienteDto)).rejects.toThrow(
          'CNPJ já cadastrado',
      );
    });
  });
});