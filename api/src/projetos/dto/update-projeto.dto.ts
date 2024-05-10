import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  nome?: string;

  @ApiProperty({ required: false })
  descricao?: string;

  @ApiProperty({ required: false })
  cliente?: string;
}
