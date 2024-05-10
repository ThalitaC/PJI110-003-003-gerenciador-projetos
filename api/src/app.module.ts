import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesService } from './clientes/clientes.service';
import { Cliente } from './clientes/entities/cliente.entity';
import { Projeto } from './projetos/entities/projeto.entity';
import { ProjetosModule } from './projetos/projetos.module';
import { ProjetosController } from './projetos/projetos.controller';
import { ProjetosService } from './projetos/projetos.service';

@Module({
  imports: [
    ClientesModule,
    ProjetosModule,
    TypeOrmModule.forFeature([Cliente, Projeto]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: 'pass',
      synchronize: true, // apenas em dev, nao usar em prod
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // TODO: mudar atenticaçao do db para variaveis de ambiente para nao expor na aplicaçao
    }),
  ],
  controllers: [ClientesController, ProjetosController],
  providers: [ClientesService, ProjetosService],
})
export class AppModule {}
