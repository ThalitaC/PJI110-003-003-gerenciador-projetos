import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {
  nome: string;
  duracao: number;
  descricao: string;
}
