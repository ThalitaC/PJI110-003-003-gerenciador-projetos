import { Injectable } from '@nestjs/common';
import { Projeto } from './entities/projeto.entity';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import {
  CLIENTE_NAO_ENCONTRADO,
  CLIENTE_OBRIGATORIO,
  ID_INVALIDO,
  NOME_VAZIO,
} from '../erros/erros';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(Projeto) private projetoRepository: Repository<Projeto>,
    private clientesService: ClientesService,
  ) {}

  async create(novoProjeto: CreateProjetoDto): Promise<Projeto> {
    await this.validaNome(novoProjeto.nome);
    await this.validaCliente(novoProjeto.cliente);

    const projeto: DeepPartial<Projeto> = {
      ...novoProjeto,
      cliente: { id: novoProjeto.cliente },
    };
    return await this.projetoRepository.save(projeto);
  }

  private async validaNome(nome: string) {
    if (!nome) {
      throw new Error(NOME_VAZIO);
    }
  }

  private async validaCliente(id: string) {
    if (!id) {
      throw new Error(CLIENTE_OBRIGATORIO);
    }

    const idUuid = id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    if (!idUuid) {
      throw new Error(ID_INVALIDO);
    }

    const cliente = await this.clientesService.findOne(id);

    if (!cliente) {
      throw new Error(CLIENTE_NAO_ENCONTRADO);
    }
  }
}
