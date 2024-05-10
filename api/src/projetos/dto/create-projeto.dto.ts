import { ApiProperty } from '@nestjs/swagger';

export class CreateProjetoDto {
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty({ required: false })
  descricao?: string;

  @ApiProperty({ description: 'O id do cliente ' })
  cliente: string;
}
