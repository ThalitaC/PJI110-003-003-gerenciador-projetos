import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projeto } from '../../projetos/entities/projeto.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Projeto, (projeto) => projeto.cliente)
  projetos: Projeto[];

  @Column({ name: 'cliente_nome', type: 'varchar', nullable: false })
  nome: string;

  @Column({ name: 'cliente_email', type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'cliente_telefone', type: 'varchar', nullable: true })
  telefone: string;

  @Column({
    name: 'cliente_cnpj',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  cnpj: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;

  @DeleteDateColumn({ name: 'deletado_em' })
  deletadoEm: string;
}
