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

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'date' })
  yearEntry: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Auth, (auth) => auth.users, { nullable: true }) // Assuming an Auth entity
  auth: Auth;

  @Column({type:'uuid', nullable: true, unique:true })
  idPsikolog: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Faculty, (faculty) => faculty.users) // Assuming a Faculty entity
  faculty: Faculty;

  @Column({
    type: 'enum',
    enum: ['Laki-Laki', 'Perempuan'],
  })
  gender: 'Laki-Laki' | 'Perempuan';
}
