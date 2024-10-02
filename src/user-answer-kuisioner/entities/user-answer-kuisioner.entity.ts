import { Answer } from 'src/answers/entities/answer.entity';
import { TakeKuisioner } from 'src/take-kuisioner/entities/take-kuisioner.entity';
import { ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class UserAnswerKuisioner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => TakeKuisioner,
    (takeKuisioner) => takeKuisioner.userAnswerKuisioner,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  takeKuisioner: TakeKuisioner;

  @ManyToOne(() => Answer, (answer) => answer.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  answer: Answer;
}
