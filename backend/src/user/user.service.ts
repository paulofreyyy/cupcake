import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(data: Partial<User>): Promise<User> {
        const user = new this.userModel(data);
        return user.save();
    }

    async findOne(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async getProfile(userId: string): Promise<UserDocument> {
        const user = this.userModel.findById(userId)
        if (!user) throw new NotFoundException("Usuário não encontrado")

        return user
    }
}
