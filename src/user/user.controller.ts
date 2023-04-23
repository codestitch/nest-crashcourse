import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserId(@Param('id') id: string): User {
    // TODO: auto parse id param from string to number
    return this.userService.findById(Number(id));
  }

  @Post()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.createUser(user);
  }
}
