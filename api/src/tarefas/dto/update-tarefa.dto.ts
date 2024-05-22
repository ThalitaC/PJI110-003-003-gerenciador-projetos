import { PartialType } from '@nestjs/mapped-types';
import { CreateTarefaDto } from './create-tarefa.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  nome: string;

  @ApiProperty({ required: false })
  duracao: number;

  @ApiProperty({ required: false })
  descricao: string;

  @ApiProperty({ required: false })
  semana: string;

  @ApiProperty({ required: false })
  projetoId: string;
}
