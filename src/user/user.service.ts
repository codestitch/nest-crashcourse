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
    {
      id: 1,
      name: 'Maria',
    },
  ];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter(
        (user) => user.name.toLowerCase() === name.toLowerCase(),
      );
    }
    return this.users;
  }

  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto): User {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);

    return newUser;
  }
}
