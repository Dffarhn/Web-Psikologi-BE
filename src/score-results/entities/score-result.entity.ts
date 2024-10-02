import { Symtomp } from 'src/symtomps/entities/symtomp.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Level } from '../group/level.enum';
import { TakeKuisioner } from 'src/take-kuisioner/entities/take-kuisioner.entity';

@Entity()
export class ScoreResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Level,
    enumName: 'level_enum', // Optional: for defining the enum name in the database
  })
  level: Level;

  @Column({ type: 'int' })
  score: number;

  @ManyToOne(() => Symtomp, (symtomp) => symtomp.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  symtomp: Symtomp;

  @ManyToOne(
    () => TakeKuisioner,
    (takeKuisioner) => takeKuisioner.scoreResults,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  takeKuisioner: TakeKuisioner;
}
