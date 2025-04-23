import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(data: Partial<User>): Promise<User>{
        const user = new this.userModel(data);
        return user.save();
    }

    async findOne(username: string): Promise<UserDocument | null>{
        return this.userModel.findOne({username}).exec();
    }
}
