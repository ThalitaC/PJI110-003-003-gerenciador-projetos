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
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Tarefa } from '../../tarefas/entities/tarefa.entity';

@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.projetos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.projeto)
  tarefas: Tarefa[];

  @Column({ name: 'projeto_nome', type: 'varchar', nullable: false })
  nome: string;

  @Column({ name: 'projeto_duracao', type: 'interval', nullable: true })
  duracao: number;

  @Column({ name: 'projeto_descricao', type: 'varchar', nullable: true })
  descricao: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;

  @DeleteDateColumn({ name: 'deletado_em' })
  deletadoEm: string;
}
