import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Projeto } from '../projetos/entities/projeto.entity';
import { ProjetosService } from '../projetos/projetos.service';
import { TarefasController } from './tarefas.controller';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, Projeto, Cliente])],
  controllers: [TarefasController],
  providers: [TarefasService, ProjetosService, ClientesService],
})
export class TarefasModule {}
