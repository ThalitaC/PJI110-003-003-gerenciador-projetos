import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from '../clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto, Cliente])],
  controllers: [ProjetosController],
  providers: [ClientesService, ProjetosService],
})
export class ProjetosModule {}
