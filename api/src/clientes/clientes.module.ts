import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Projeto } from '../projetos/entities/projeto.entity';
import { ProjetosService } from '../projetos/projetos.service';
import { Tarefa } from '../tarefas/entities/tarefa.entity';
import { TarefasService } from '../tarefas/tarefas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Projeto, Tarefa])],
  controllers: [ClientesController],
  providers: [ClientesService, ProjetosService, TarefasService],
})
export class ClientesModule {}
