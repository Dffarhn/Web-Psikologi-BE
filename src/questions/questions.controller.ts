import { Body, Controller, Get, HttpStatus, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { Question } from './entities/question.entity';
import { BodyCreateQuestionDto } from './dto/create-question.dto';

@Controller({ path: 'questions', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionsController {
  constructor(
    private questionService: QuestionsService,
  ) {}

  @Get(':id')
  @IsVerificationRequired(true)
  @Roles(ROLES.USER, ROLES.SUPERADMIN, ROLES.ADMIN)
  async findone(@Param('id') id:string): Promise<ResponseApi<Question>> {
    const payload = await this.questionService.findOne(id)
    return new ResponseApi(HttpStatus.OK, 'Succesfully Get All Question',payload);
  }


  @Post(':id')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async create(@Param('id') id:string,@Body() createQuestionDTO:BodyCreateQuestionDto): Promise<ResponseApi<Question>> {
    const payload = await this.questionService.create(id,createQuestionDTO)
    return new ResponseApi(HttpStatus.CREATED, 'Succesfully Get All Question',payload);
  }
}
