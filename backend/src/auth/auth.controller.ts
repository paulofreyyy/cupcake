
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: RegisterDto) {
        const {username, password} = signInDto;
        return this.authService.signIn(username, password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
