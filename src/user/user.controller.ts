import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  list(): Promise<UserEntity[]> {
    return this.userService.list();
  }

  @Post()
  create(@Body('name') name: string): Promise<UserEntity> {
    return this.userService.create(name);
  }
}
