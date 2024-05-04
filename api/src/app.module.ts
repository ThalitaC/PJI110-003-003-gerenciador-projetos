import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesService } from './clientes/clientes.service';
import { Cliente } from './clientes/entities/cliente.entity';

@Module({
  imports: [
    ClientesModule,
    TypeOrmModule.forFeature([Cliente]),
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
  controllers: [AppController, ClientesController],
  providers: [AppService, ClientesService],
})
export class AppModule {}
