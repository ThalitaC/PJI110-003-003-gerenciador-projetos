import { ApiProperty } from '@nestjs/swagger';

export class CreateTarefaDto {
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty({ required: false })
  duracao: number;

  @ApiProperty({ required: false })
  descricao: string;

  @ApiProperty()
  projetoId: string;
}
