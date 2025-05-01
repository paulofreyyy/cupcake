import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user: UserDocument = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException('Credenciais inválidas: Usuário não encontrado');
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas: Senha incorreta');

        const payload = { sub: user._id.toString(), email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async register(registerDto: RegisterDto): Promise<{ message: string }> {
        const { email, password, name } = registerDto;

        const existingUser = await this.userService.findOne(email);
        if (existingUser) {
            throw new ConflictException('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userService.create({
            email,
            password: hashedPassword,
            name
        });

        return { message: 'Usuário criado com sucesso' };
    }
}
