import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('facultys')
export class Faculty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type:'varchar',length:255 })
  nama: string;

  @OneToMany(() => User, (user) => user.faculty)
  users: User[];
}
