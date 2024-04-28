import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { TarefasModule } from './tarefas/tarefas.module';

@Module({
  imports: [ClientesModule, ProjetosModule, TarefasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
