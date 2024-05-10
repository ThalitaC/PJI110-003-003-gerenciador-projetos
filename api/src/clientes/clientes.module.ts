import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Projeto } from '../projetos/entities/projeto.entity';
import { ProjetosService } from '../projetos/projetos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Projeto])],
  controllers: [ClientesController],
  providers: [ClientesService, ProjetosService],
})
export class ClientesModule {}
