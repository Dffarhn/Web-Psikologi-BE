import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { Question } from './entities/question.entity';
import { BodyCreateQuestionDto } from './dto/create-question.dto';
import { CreateQuestionInterface } from './interfaces/createQuestion.interface';

@Controller({ path: 'questions', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Get(':questionId')
  @IsVerificationRequired(true)
  @Roles(ROLES.USER, ROLES.SUPERADMIN, ROLES.ADMIN)
  async findone(
    @Param('questionId', new ParseUUIDPipe()) questionId: string,
  ): Promise<ResponseApi<Question>> {
    try {
      const payload = await this.questionService.findOne(questionId);
      return new ResponseApi(
        HttpStatus.OK,
        'Successfully fetched question',
        payload,
      );
    } catch (error) {
      // Check if the error is an instance of HttpException (covers all known HTTP exceptions)
      if (error instanceof HttpException) {
        throw error; // Re-throw all known HTTP exceptions (Forbidden, Unauthorized, BadRequest, etc.)
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  @Post(':subKuisionerId')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async create(
    @Param('subKuisionerId', new ParseUUIDPipe()) subKuisionerId: string,
    @Body() createQuestionDTO: BodyCreateQuestionDto,
  ): Promise<ResponseApi<CreateQuestionInterface>> {
    try {
      const payload = await this.questionService.create(
        subKuisionerId,
        createQuestionDTO,
      );
      return new ResponseApi(
        HttpStatus.CREATED,
        'Successfully created question',
        payload,
      );
    } catch (error) {
      // Check if the error is an instance of HttpException (covers all known HTTP exceptions)
      if (error instanceof HttpException) {
        throw error; // Re-throw all known HTTP exceptions (Forbidden, Unauthorized, BadRequest, etc.)
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
