import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { ResendConfirmationDTO } from './dto/resendAuth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { randomUUID } from 'crypto';
import { FacultysService } from 'src/facultys/facultys.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { generateConfirmationEmailContent } from 'src/common/function/email.generator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    @Inject(FacultysService)
    private facultyService: FacultysService,

    @Inject(EmailService)
    private emailService: EmailService,

    @Inject(UserService)
    private userService: UserService,
  ) {}

  private readonly saltRounds = 10;

  private async isEmailNotExist(email: string): Promise<boolean> {
    const existingUser = await this.userService.findByEmail(email);
    return !existingUser; // Returns true if no user found
  }

  async createAuth(): Promise<Auth> {
    const newAuth = this.authRepository.create({
      token: this.generateTokenConfirmation(), // Generate a confirmation token
    });

    // Save the new auth record to get the generated ID
    const savedAuth = await this.authRepository.save(newAuth);
    return savedAuth;
  }

  async register(
    registerAuthDTO: RegisterAuthDTO,
  ): Promise<RegisterInterfaces> {
    try {
      // Check if the email is already registered
      const emailNotExists = await this.isEmailNotExist(registerAuthDTO.email);
      if (!emailNotExists) {
        throw new ForbiddenException(
          'The email is already in use by another account',
        );
      }

      // Check if passwords match
      if (registerAuthDTO.password !== registerAuthDTO.retypedpassword) {
        throw new BadRequestException('Passwords do not match');
      }

      // Check if faculty exists
      const faculty = await this.facultyService.getFacultyById(
        registerAuthDTO.facultyId,
      );
      if (!faculty) {
        throw new BadRequestException('Invalid Faculty ID');
      }

      // Hash the password
      const hashedPassword = await this.hashPassword(registerAuthDTO.password);

      // Create a new auth record with token
      const authRecord = await this.createAuth();

      // Prepare user data
      const newUser = {
        email: registerAuthDTO.email,
        username: registerAuthDTO.username,
        password: hashedPassword,
        birthDate: new Date(registerAuthDTO.birthDate),
        yearEntry: registerAuthDTO.yearEntry,
        faculty,
        gender: registerAuthDTO.gender,
        auth: authRecord,
      };

      // Save the user
      await this.userService.create(newUser);


      
      const confirmationLink = `http://localhost:3000/confirm?token=${authRecord.token}&&idAuth=${authRecord.id}`;

      const emailContent = generateConfirmationEmailContent(registerAuthDTO.username, confirmationLink);

      // Now you can use `emailContent` in your sendEmail function
      const response = await this.emailService.sendEmail(registerAuthDTO.email, 'Confirm Your Email - Emind', emailContent);


      // Return success response
      return {
        created_at: new Date(),
      };
    } catch (error) {
      // Handle unexpected errors
      throw new BadRequestException(
        'Failed to register user: ' + error.message,
      );
    }
  }
  async login(loginAuthDTO: LoginAuthDTO): Promise<LoginInterfaces> {
    const user = await this.userService.findByEmail(loginAuthDTO.email);

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(
      loginAuthDTO.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const data: LoginInterfaces = {
      access_token: 'user access_token',
      refresh_token: 'user refresh_token',
    };

    return data;
  }

  // resendConfirmation(
  //   resendConfirmationDTO: ResendConfirmationDTO,
  // ): ResponseApi<string> {
  //   return new ResponseApi(
  //     HttpStatus.CREATED,
  //     'Successfully Resend Confirmation',
  //     'Berhasil',
  //   );
  // }

  // confirmEmail(authId: string, token: string): ResponseApi<string> {
  //   return new ResponseApi(
  //     HttpStatus.OK,
  //     'Successfully login user',
  //     'berhasil',
  //   );
  // }

  private generateTokenConfirmation(): string {
    return randomUUID();
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
