import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(name: string): Promise<UserEntity> {
    return await this.userRepository.save({ name });
  }
}
