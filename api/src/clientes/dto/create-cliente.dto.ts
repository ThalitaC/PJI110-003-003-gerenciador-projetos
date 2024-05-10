import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  telefone?: string;

  @ApiProperty({ required: false })
  cnpj?: string;
}
