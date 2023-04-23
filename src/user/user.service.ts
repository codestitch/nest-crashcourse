import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 0,
      name: 'Joe',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto): User {
    const newUser = { id: Date.now(), ...user };
    this.users = [...this.users, newUser];

    return newUser;
  }
}