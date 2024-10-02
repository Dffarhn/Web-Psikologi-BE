import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './common/middleware/loggingRoute.middleware';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { FacultysModule } from './facultys/facultys.module';
import { EmailModule } from './email/email.module';
import { KuisionerModule } from './kuisioner/kuisioner.module';
import { SubKuisionerModule } from './sub-kuisioner/sub-kuisioner.module';
import { SymtompsModule } from './symtomps/symtomps.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TakeKuisionerModule } from './take-kuisioner/take-kuisioner.module';
import { UserAnswerKuisionerModule } from './user-answer-kuisioner/user-answer-kuisioner.module';
import { ScoreResultsModule } from './score-results/score-results.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    RolesModule,
    FacultysModule,
    EmailModule,
    KuisionerModule,
    SubKuisionerModule,
    SymtompsModule,
    QuestionsModule,
    AnswersModule,
    TakeKuisionerModule,
    UserAnswerKuisionerModule,
    ScoreResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
