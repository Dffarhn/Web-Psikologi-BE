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
import { UserAnswerSubKuisionerModule } from './user-answer-sub-kuisioner/user-answer-sub-kuisioner.module';
import { ClientPsychologistModule } from './client_psychologist/client_psychologist.module';
import { PyschologyModule } from './pyschology/pyschology.module';

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
    UserAnswerSubKuisionerModule,
    ClientPsychologistModule,
    PyschologyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
