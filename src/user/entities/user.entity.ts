import { Auth } from 'src/auth/entities/auth.entity';
import { Faculty } from 'src/facultys/entities/faculty.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('userEminds')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable:true })
  nim: string;

  @Column({ type: 'date', nullable:true })
  birthDate: Date;

  @Column({ type: 'integer', nullable:true })
  yearEntry: number;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  role: Role;

  @ManyToOne(() => Auth, (auth) => auth.users, { nullable: false , onDelete:'CASCADE', onUpdate:'CASCADE'}) // Assuming an Auth entity
  auth: Auth;

  @Column({type:'uuid', nullable: true, unique:true })
  idPsikolog: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Faculty, (faculty) => faculty.users,{ nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Assuming a Faculty entity
  faculty: Faculty;

  @Column({
    type: 'enum',
    enum: ['Laki-Laki', 'Perempuan'],
    nullable: true
  })
  gender: 'Laki-Laki' | 'Perempuan';
}
