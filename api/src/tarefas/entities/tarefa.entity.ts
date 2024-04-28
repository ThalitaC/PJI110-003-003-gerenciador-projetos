import {Entity, PrimaryColumn} from "typeorm";

@Entity('tarefas')
export class Tarefa {
    @PrimaryColumn()
    id: string

    nome: string
    duracao: number
    projetoId: string
}
