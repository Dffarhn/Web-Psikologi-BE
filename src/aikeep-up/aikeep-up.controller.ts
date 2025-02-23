import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { AikeepUpDto } from './dto/aikeep-up.dto';
import {
  transformPreKuisionerUserAnswer,
  transformUserAnswerSubKuisioner,
} from 'src/common/function/helper/exportProses.function';
import { transformPreKuisionerUserAnswerFromEntity } from 'src/common/function/helper/preKuisionerUserProses.function';
import { ReportData } from 'src/take-kuisioner/take-kuisioner.model';
import { TakeKuisioner } from 'src/take-kuisioner/entities/take-kuisioner.entity';
import { AikeepUpService } from './aikeep-up.service';
import { ResponseApi } from 'src/common/response/responseApi.format';

@Controller({ path: 'ai', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class AIkeepUpController {
  constructor(
    @InjectRepository(TakeKuisioner)
    private readonly takeKuisionerRepository: Repository<TakeKuisioner>,

    private readonly aiKeepUpService: AikeepUpService,
  ) {}

  @Post('/testing/report')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async testingReport(@Body() req: AikeepUpDto) {
    const getKuisionerLatest = await this.takeKuisionerRepository.findOne({
      where: { user: { id: req.userId }, isFinish: true },
      order: { createdAt: 'DESC' }, // Order by createdAt in descending order
      relations: [
        'user',
        'user.faculty',
        'user.userPsycholog',
        'user.userPsycholog.psychologist',
        'user.preKuisioner',
        'user.preKuisioner.preKuisionerUserAnswer',
        'user.preKuisioner.preKuisionerUserAnswer.preKuisionerAnswer',
        'user.preKuisioner.preKuisionerUserAnswer.preKuisionerAnswer.preQuestionId',
        'user.preKuisioner.preKuisionerUserAnswer.preKuisionerAnswer.preQuestionId.category',
        'userAnswerSubKuisioner',
        'userAnswerSubKuisioner.subKuisioner',
        'userAnswerSubKuisioner.subKuisioner.symtompId',
        'userAnswerSubKuisioner.userAnswerKuisioners',
        'userAnswerSubKuisioner.userAnswerKuisioners.answer',
        'userAnswerSubKuisioner.userAnswerKuisioners.answer.questionId',
      ],
    });

    if (!getKuisionerLatest) {
      return { message: 'No completed questionnaire found for the user' };
    }

    const preKuisionerData = getKuisionerLatest.user.preKuisioner
      ? transformPreKuisionerUserAnswerFromEntity(
          getKuisionerLatest.user.preKuisioner,
        )
      : null;

    const preKuisionerDataFinal = preKuisionerData
      ? transformPreKuisionerUserAnswer(preKuisionerData.preKuisionerUserAnswer)
      : null;

    const subKuisionerFinalData = getKuisionerLatest.userAnswerSubKuisioner
      ? transformUserAnswerSubKuisioner(
          getKuisionerLatest.userAnswerSubKuisioner,
        )
      : null;

    const DataGenerateAIReport: ReportData = {
      background: preKuisionerDataFinal,
      result: subKuisionerFinalData,
      user: getKuisionerLatest.user,
    };

    return new ResponseApi(HttpStatus.CREATED, 'Generate Successfully', {
      result: await this.aiKeepUpService.generateReportTesting(
        DataGenerateAIReport,
        req.gptPrompt,
        req.gptSystem,
      ),
    });
  }
}
