import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { randomUUID } from 'crypto';
import { FacultysService } from 'src/facultys/facultys.service';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import {
  comparePasswords,
  hashPassword,
} from 'src/common/function/password.function';

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

    private dataSource: DataSource,
  ) {}

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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

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
      const hashedPassword = await hashPassword(registerAuthDTO.password);

      // Create a new auth record with token
      const authRecord = await this.createAuth();

      // Create an instance of the User entity
      const newUser = new User();
      newUser.email = registerAuthDTO.email;
      newUser.username = registerAuthDTO.username;
      newUser.password = hashedPassword;
      newUser.birthDate = new Date(registerAuthDTO.birthDate);
      newUser.yearEntry = registerAuthDTO.yearEntry;
      newUser.faculty = faculty;
      newUser.gender = registerAuthDTO.gender;
      newUser.auth = authRecord;

      // Save the user using the query runner's transactional method
      await queryRunner.manager.save(User, newUser); // Pass the entity and instance to save

      // Send the confirmation email
      await this.emailService.sendConfirmationEmail(
        registerAuthDTO.email,
        registerAuthDTO.username,
        authRecord.token,
        authRecord.id,
      );

      // Commit the transaction if everything is successful
      await queryRunner.commitTransaction();

      // Return success response
      return {
        created_at: new Date(),
      };
    } catch (error) {
      // Roll back the transaction in case of any failure
      await queryRunner.rollbackTransaction();

      // Check if the error is an instance of HttpException (covers all known HTTP exceptions)
      if (error instanceof HttpException) {
        throw error; // Re-throw all known HTTP exceptions (Forbidden, Unauthorized, BadRequest, etc.)
      }

      throw new InternalServerErrorException(
        error.message,
      );
    } finally {
      // Release the query runner after the transaction
      await queryRunner.release();
    }
  }

  async login(loginAuthDTO: LoginAuthDTO): Promise<LoginInterfaces> {
    const user = await this.userService.findByEmail(loginAuthDTO.email);

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await comparePasswords(
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

  async confirmEmail(authId: string, token: string): Promise<boolean> {
    try {
      // Find the auth record by authId and token
      const authRecord = await this.authRepository.findOne({
        where: { id: authId, token },
      });

      // Check if the auth record exists
      if (!authRecord) {
        throw new BadRequestException('Invalid token or authId');
      }

      // Check if the email is already confirmed
      if (authRecord.isVerification) {
        throw new BadRequestException('Email is already confirmed');
      }

      // Mark the email as confirmed
      authRecord.isVerification = true;
      authRecord.verificationAt = new Date();
      await this.authRepository.save(authRecord);

      return true; // Return true if the confirmation was successful
    } catch (error) {
      // Check if the error is an instance of HttpException (covers all known HTTP exceptions)
      if (error instanceof HttpException) {
        throw error; // Re-throw all known HTTP exceptions (Forbidden, Unauthorized, BadRequest, etc.)
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred during registration. Please try again later.',
      );
    }
  }

  private generateTokenConfirmation(): string {
    return randomUUID();
  }
}
