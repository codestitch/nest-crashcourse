import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  getUser(): User[] {
    return this.userService.findAll();
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  getUserId(@Param('id') id: string): User {
    // TODO: auto parse id param from string to number
    return this.userService.findById(Number(id));
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.createUser(user);
  }
}
