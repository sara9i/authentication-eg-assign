import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private readonly logger: Logger
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const newUser = this.userModel.create({
        name,
        email,
        password
      });
      return newUser;
    } catch (err) {
      throw new BadRequestException('custom');
    }
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
