import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
