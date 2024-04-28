import {Entity, PrimaryColumn} from "typeorm";

@Entity('projetos')
export class Projeto {
    @PrimaryColumn()
    id: string;

    nome: string;
    duracao: number;
    clienteId: string;
}
