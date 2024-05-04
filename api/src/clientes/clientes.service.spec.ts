import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

describe('ClientesService', () => {
  let clientesService: ClientesService;
  let clienteRepository: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: 'ClienteRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    clientesService = module.get<ClientesService>(ClientesService);
    clienteRepository = module.get<Repository<Cliente>>('ClienteRepository');
  });

  describe('create', () => {
    it('deve criar um novo cliente', async () => {
      const createClienteDto = {
        nome: 'Teste Cliente',
        email: 'test@exemplo.com',
        telefone: '123456789',
        cnpj: '123456789',
      };

      const savedCliente = {
        id: '1',
        nome: 'Teste Cliente',
        email: 'test@exemplo.com',
        telefone: '123456789',
        cnpj: '123456789',
        projetos: [],
        criadoEm: new Date().getDate().toString(),
        atualizadoEm: null,
        deletadoEm: null,
      };

      jest.spyOn(clienteRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(clienteRepository, 'create').mockReturnValueOnce(savedCliente);
      jest.spyOn(clienteRepository, 'save').mockResolvedValueOnce(savedCliente);

      const result = await clientesService.create(
        createClienteDto.nome,
        createClienteDto.email,
        createClienteDto.telefone,
        createClienteDto.cnpj,
      );

      expect(result).toEqual(savedCliente);
      expect(clienteRepository.findOne).toHaveBeenCalledWith({
        where: { cnpj: '123456789' },
      });
      expect(clienteRepository.create).toHaveBeenCalledWith(createClienteDto);
      expect(clienteRepository.save).toHaveBeenCalledWith(savedCliente);
    });

    it('deve retornar um erro se o cnpj ja estiver em uso', async () => {
      const createClienteDto = {
        nome: 'Test Cliente',
        email: 'test@exemplo.com',
        telefone: '123456789',
        cnpj: '123456789',
      };

      const clienteExistente = {
        id: '1',
        nome: 'Cliente Existente',
        email: 'existente@exemplo.com',
        telefone: '987654321',
        cnpj: '123456789',
        projetos: [],
        criadoEm: new Date().getDate().toString(),
        atualizadoEm: null,
        deletadoEm: null,
      };

      jest
        .spyOn(clienteRepository, 'findOne')
        .mockResolvedValueOnce(clienteExistente);

      await expect(
        clientesService.create(
          createClienteDto.nome,
          createClienteDto.email,
          createClienteDto.telefone,
          createClienteDto.cnpj,
        ),
      ).rejects.toThrow('CNPJ já cadastrado');
      expect(clienteRepository.findOne).toHaveBeenCalledWith({
        where: { cnpj: '123456789' },
      });
    });
  });
});
