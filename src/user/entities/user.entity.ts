import { Auth } from 'src/auth/entities/auth.entity';
import { ClientPsychologist } from 'src/client_psychologist/entities/client_psychologist.entity';
import { Faculty } from 'src/facultys/entities/faculty.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PsikologiStatus } from '../../pyschology/group/psikologiStatus.enum';

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

  @Column({ type: 'varchar', nullable: true })
  nim: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'integer', nullable: true })
  yearEntry: number;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role;

  @OneToOne(() => Auth, (auth) => auth.users, { cascade: true, onDelete: 'CASCADE',onUpdate:'CASCADE' })
  @JoinColumn()  // Creates the foreign key in the User table
  auth: Auth;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Faculty, (faculty) => faculty.users, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) // Assuming a Faculty entity
  faculty: Faculty;

  @Column({
    type: 'enum',
    enum: ['Laki-Laki', 'Perempuan'],
    nullable: true,
  })
  gender: 'Laki-Laki' | 'Perempuan';
  

  // Field to indicate the status of psychologist account approval
  @Column({
    nullable: true,
    type: 'enum',
    enum: PsikologiStatus,
  })
  psikologStatus: PsikologiStatus; // Status for psychologist approval

  // Relation for psychologist having many clients
  @OneToMany(
    () => ClientPsychologist,
    (clientPsychologist) => clientPsychologist.psychologist,
  )
  psychologistClients: ClientPsychologist[]; // A psychologist can have many clients
}
