import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUser(@Query('name') name: string): User[] {
    return this.userService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserId(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.createUser(user);
  }
}
