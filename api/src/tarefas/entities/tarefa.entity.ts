import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projeto } from '../../projetos/entities/projeto.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('tarefas')
export class Tarefa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Projeto, (projeto) => projeto.tarefas)
  @JoinColumn({ name: 'projeto_id' })
  projeto: Projeto;

  @ManyToOne(() => Cliente, (cliente) => cliente.projetos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.projeto)
  tarefas: Tarefa[];

  @Column({ name: 'tarefa_nome', type: 'varchar', nullable: false })
  nome: string;

  @Column({ name: 'tarefa_duracao', type: 'interval', nullable: false })
  duracao: number;

  @Column({ name: 'tarefa_semana', type: 'integer', nullable: false })
  semana: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;

  @DeleteDateColumn({ name: 'deletado_em' })
  deletadoEm: string;
}
