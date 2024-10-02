import { Kuisioner } from 'src/kuisioner/entity/kuisioner.entity';
import { ScoreResult } from 'src/score-results/entities/score-result.entity';
import { UserAnswerKuisioner } from 'src/user-answer-kuisioner/entities/user-answer-kuisioner.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity()
export class TakeKuisioner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  isFinish: boolean;

  @Column({ type: 'text', nullable: true })
  report: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Kuisioner, (kuisioner) => kuisioner.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  kuisioner: Kuisioner;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => ScoreResult, (scoreResult) => scoreResult.takeKuisioner)
  scoreResults: ScoreResult[];

  @OneToMany(
    () => UserAnswerKuisioner,
    (userAnswerKuisioner) => userAnswerKuisioner.takeKuisioner,
  )
  userAnswerKuisioner: UserAnswerKuisioner[];
}
