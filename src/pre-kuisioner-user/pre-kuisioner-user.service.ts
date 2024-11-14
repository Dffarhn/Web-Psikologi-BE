import { Injectable } from '@nestjs/common';
import { CreatePreKuisionerUserDto } from './dto/create-pre-kuisioner-user.dto';
import { UpdatePreKuisionerUserDto } from './dto/update-pre-kuisioner-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PreKuisionerUser } from './entities/pre-kuisioner-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreKuisionerUserService {

  constructor(
    @InjectRepository(PreKuisionerUser)
    private readonly preKuisionerUser: Repository<PreKuisionerUser>
  ) { }

  create(createPreKuisionerUserDto: CreatePreKuisionerUserDto) {
    return 'This action adds a new preKuisionerUser';
  }

  findAll() {
    return `This action returns all preKuisionerUser`;
  }

  async findOne(id: string): Promise<any> {
    const userWithAnswers = await this.preKuisionerUser.findOne({
      where: { user: { id } },
      relations: [
        "user",
        "preKuisionerUserAnswer",
        "preKuisionerUserAnswer.preKuisionerAnswer",
        "preKuisionerUserAnswer.preKuisionerAnswer.preQuestionId",
        "preKuisionerUserAnswer.preKuisionerAnswer.preQuestionId.category",
      ],
    });

    if (!userWithAnswers) {
      return null; // Handle the case where the user is not found
    }

    // Group answers by category
    const groupedByCategory = userWithAnswers.preKuisionerUserAnswer.reduce((acc, answer) => {
      const categoryId = answer.preKuisionerAnswer.preQuestionId.category.id; // Replace with actual category ID property
      const categoryName = answer.preKuisionerAnswer.preQuestionId.category.name; // Replace with actual category name property

      // Find existing category group or create a new one
      let categoryGroup = acc.find(group => group.categoryId === categoryId);
      if (!categoryGroup) {
        categoryGroup = {
          categoryId,
          categoryName,
          preKuisionerAnswer: [],
        };
        acc.push(categoryGroup);
      }

      // Add the answer to the corresponding category group
      categoryGroup.preKuisionerAnswer.push(answer);

      return acc;
    }, []);

    // Return the transformed data structure
    return {
      ...userWithAnswers,
      preKuisionerUserAnswer: groupedByCategory,
    };
  }



  update(id: number, updatePreKuisionerUserDto: UpdatePreKuisionerUserDto) {
    return `This action updates a #${id} preKuisionerUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} preKuisionerUser`;
  }
}
