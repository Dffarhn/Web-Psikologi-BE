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


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    @Inject(FacultysService)
    private facultyService: FacultysService,

    @Inject(EmailService)
    private emailService: EmailService,
  ) {}

  private async IsEmailNotExist(CheckEmail: string): Promise<boolean> {
    const checkEmail = await this.userRepository.findOne({
      where: { email: CheckEmail },
    });

    if (checkEmail) {
      return false;
    }
    return true;
  }

  async register(
    registerAuthDTO: RegisterAuthDTO,
  ): Promise<ResponseApi<RegisterInterfaces>> {
    // Check if the email already exists
    if (!(await this.IsEmailNotExist(registerAuthDTO.email))) {
      throw new ForbiddenException(
        'The email is already in use by another account',
      );
    }

    const faculty = await this.facultyService.getFaculty(
      registerAuthDTO.faculty,
    );

    // Check if the passwords match
    if (registerAuthDTO.password !== registerAuthDTO.retypedpassword) {
      throw new BadRequestException('Your Passwords do not match');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(registerAuthDTO.password, 10);

    // Create a new authentication record
    const newAuth = this.authRepository.create({
      token: this.generateTokenConfirmation(), // Generate a confirmation token
    });

    // Save the new auth record to get the generated ID
    const savedAuth = await this.authRepository.save(newAuth);

    // Create a new user instance
    const newUser = this.userRepository.create({
      email: registerAuthDTO.email, // Assuming you want to store the email
      username: registerAuthDTO.username,
      password: hashedPassword, // Ensure you hash the password before saving
      birthDate: new Date(registerAuthDTO.birthDate),
      yearEntry: registerAuthDTO.yearEntry,
      auth: savedAuth, // Link the user to the auth record
      faculty: faculty.data, // Assuming faculty is provided in DTO
      gender: registerAuthDTO.gender, // Assuming gender is provided in DTO
    });

    // Save the new user to the database
    await this.userRepository.save(newUser);

    // Prepare the response data
    const data: RegisterInterfaces = {
      created_at: new Date(), // Include user ID if needed
    };

    return new ResponseApi(
      HttpStatus.CREATED,
      'Successfully registered user',
      data,
    );
  }

  async login(loginAuthDTO: LoginAuthDTO): Promise<ResponseApi<LoginInterfaces>> {
    const user = await this.userRepository.findOne({
      where: { email: loginAuthDTO.email },
    });
  
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(
      loginAuthDTO.password,
      user.password, // Compare the hashed password
    );
  
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }
  
    const data: LoginInterfaces = {
      access_token: 'user access_token',
      refresh_token: 'user refresh_token',
    };
  
    return new ResponseApi(HttpStatus.OK, 'Successfully login user', data);
  }
  

  resendConfirmation(
    resendConfirmationDTO: ResendConfirmationDTO,
  ): ResponseApi<string> {
    return new ResponseApi(
      HttpStatus.CREATED,
      'Successfully Resend Confirmation',
      'Berhasil',
    );
  }

  confirmEmail(authId: string, token: string): ResponseApi<string> {
    return new ResponseApi(
      HttpStatus.OK,
      'Successfully login user',
      'berhasil',
    );
  }

  private generateTokenConfirmation(): string {
    return randomUUID();
  }
}
