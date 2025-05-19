import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':userId')
    getProfile(@Param('userId') userId: string) {
        return this.userService.getProfile(userId)
    }
}
