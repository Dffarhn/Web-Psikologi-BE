import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Gender } from 'src/common/group/gender.enum';
import { isNotBlank } from 'src/common/validatorCustom/isNotBlank.validator';

export class RegisterAuthDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @isNotBlank({ message: 'Email cannot be blank' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @isNotBlank({ message: 'Password cannot be blank' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @isNotBlank({ message: 'Password cannot be blank' })
  password: string;

  @IsNotEmpty({ message: 'Password is required' })
  @isNotBlank({ message: 'Password cannot be blank' })
  retypedpassword: string;

  @IsNotEmpty({ message: 'Faculty is requires' })
  @isNotBlank({ message: 'Faculty cannot be blank' })
  @IsUUID()
  faculty: string;

  @IsNotEmpty({ message: 'Gender is requires' })
  @isNotBlank({ message: 'Gender cannot be blank' })
  @IsEnum(Gender, {
    message: 'Gender must be either "Laki-Laki" or "Perempuan"',
  })
  gender: Gender;

  @IsNotEmpty({ message: 'Year of entry is required' })
  @IsInt({ message: 'Year of entry must be an integer' })
  yearEntry: number;

  @IsNotEmpty({ message: 'Birth date is required' })
  @isNotBlank({ message: 'Birth date cannot be blank' })
  @IsDateString() // Validates that the string is a date
  birthDate: string;
}
function IsFacultyExists(): (target: RegisterAuthDTO, propertyKey: "faculty") => void {
  throw new Error('Function not implemented.');
}

