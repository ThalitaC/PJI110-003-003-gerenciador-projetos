import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Tarefa } from '../tarefas/entities/tarefa.entity';
import { TarefasService } from '../tarefas/tarefas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto, Cliente, Tarefa])],
  controllers: [ProjetosController],
  providers: [ProjetosService, ClientesService, TarefasService],
})
export class ProjetosModule {}
