import { IsEmail, IsNotEmpty } from "class-validator";
import { isNotBlank } from "src/common/validatorCustom/isNotBlank.validator";

export class LoginAuthDTO {

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    @isNotBlank({ message: 'Email cannot be blank' })
    email: string;
    
    @IsNotEmpty({ message: 'Password is required' })
    @isNotBlank({ message: 'Password cannot be blank' })
    password: string;
    
}
