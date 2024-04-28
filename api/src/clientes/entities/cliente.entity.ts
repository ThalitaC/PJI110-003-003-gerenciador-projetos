import {Entity, PrimaryColumn} from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryColumn()
    id: string;

    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
}
