import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
        })
    ],
    exports:[AuthService]
})
export class AuthModule { }
