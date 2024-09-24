import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // Remove duplicate column definition
  
  @Column({default: false, type: 'boolean'})
  isVerification: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  
  @Column({ nullable: true, type: 'timestamp' })
  verificationAt: Date;

  @Column({ nullable: false, type: 'uuid' })
  token: string;

  @OneToMany(() => User, (user) => user.auth)
  users: User[];
}
