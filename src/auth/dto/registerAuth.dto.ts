import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { isNotBlank } from 'src/common/validatorCustom/isNotBlank.validator';

export class RegisterAuthDTO extends CreateUserDto {
  @IsNotEmpty({ message: 'Password confirmation is required' })
  @isNotBlank({ message: 'Password confirmation cannot be blank' })
  retypedpassword: string;

  @IsNotEmpty({ message: 'Faculty is required' })
  @isNotBlank({ message: 'Faculty cannot be blank' })
  @IsUUID('4', { message: 'Faculty ID must be a valid UUID' })
  facultyId: string;
}
