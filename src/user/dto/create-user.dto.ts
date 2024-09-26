import { Auth } from 'src/auth/entities/auth.entity';
import { Faculty } from 'src/facultys/entities/faculty.entity';
import { IsEmail, IsNotEmpty, IsString, IsInt, IsOptional, Length, IsEnum, IsDateString } from 'class-validator';
import { Gender } from 'src/common/group/gender.enum';
import { isNotBlank } from 'src/common/validatorCustom/isNotBlank.validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @isNotBlank({ message: 'Email cannot be blank' })
  email: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  @isNotBlank({ message: 'Username cannot be blank' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  @isNotBlank({ message: 'Password cannot be blank' })
  password: string;

  @IsNotEmpty({ message: 'Year of entry is required' })
  @IsInt({ message: 'Year of entry must be an integer' })
  yearEntry: number;

  @IsNotEmpty({ message: 'Birth date is required' })
  @isNotBlank({ message: 'Birth date cannot be blank' })
  @IsDateString({}, { message: 'Birth date must be a valid date string' }) // Ensures it's a valid date string (ISO format)
  birthDate: Date;

  @IsOptional() // Mark auth as optional
  auth?: Auth;

  @IsOptional()
  idPsikologi?: string;

  @IsNotEmpty({ message: 'Faculty is required' })
  @IsOptional()
  faculty: Faculty;

  @IsNotEmpty({ message: 'Gender is required' })
  @isNotBlank({ message: 'Gender cannot be blank' })
  @IsEnum(Gender, {
    message: 'Gender must be either "Laki-Laki" or "Perempuan"',
  })
  gender: Gender;
}
