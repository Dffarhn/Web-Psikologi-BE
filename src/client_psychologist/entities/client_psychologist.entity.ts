import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('client_psychologist')
export class ClientPsychologist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.psychologistClients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  psychologist: User; // A psychologist can have many clients

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  client: User; // A client can have one psychologist

  @CreateDateColumn({type:'timestamp'})
  assignedAt: Date; // Optional: tracks when a client was assigned to a psychologist

  @UpdateDateColumn({type:'timestamp'})
  updateAt:Date
}
