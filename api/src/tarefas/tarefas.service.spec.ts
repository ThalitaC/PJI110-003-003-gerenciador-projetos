import { Test, TestingModule } from '@nestjs/testing';
import { TarefasService } from './tarefas.service';
import { Repository } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';

describe('TarefasService', () => {
  let tarefasService: TarefasService;
  let tarefasRepository: Repository<Tarefa>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarefasService,
        { provide: getRepositoryToken(Tarefa), useClass: Repository },
      ],
    }).compile();

    tarefasService = module.get<TarefasService>(TarefasService);
    tarefasRepository = module.get<Repository<Tarefa>>(
      getRepositoryToken(Tarefa),
    );
  });

  describe('create', () => {
    it('should save a new task', async () => {
      const createTarefaDto: CreateTarefaDto = {
        duracao: 3,
        id: '',
        nome: 'Test Task',
        descricao: 'This is a test task',
        projetoId: '1',
      };
      const savedTarefa = {
        ...createTarefaDto,
        id: '1',
      };

      const result = await tarefasService.create(createTarefaDto);

      expect(result).toEqual(savedTarefa);
      expect(tarefasRepository.save).toHaveBeenCalledWith(createTarefaDto);
    });
  });
});
