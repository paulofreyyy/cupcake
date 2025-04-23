import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user: UserDocument = await this.userService.findOne(username);
        if (!user) throw new UnauthorizedException('Credenciais inválidas: Usuário não encontrado');
        console.log('> hash armazenado no banco:', user.password);

        const isMatch = await bcrypt.compare(pass, user.password);
        console.log('> resultado do compare:', isMatch);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas: Senha incorreta');

        const payload = { sub: user._id.toString(), username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async register(registerDto: RegisterDto): Promise<{ message: string }> {
        const { username, password } = registerDto;

        const existingUser = await this.userService.findOne(username);
        if (existingUser) {
            throw new ConflictException('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashedPassword:', hashedPassword)
        await this.userService.create({
            username,
            password: hashedPassword,
        });

        return { message: 'Usuário criado com sucesso' };
    }
}
