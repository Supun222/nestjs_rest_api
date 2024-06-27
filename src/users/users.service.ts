import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'USER',
    },
    {
      id: 4,
      name: 'Dana White',
      email: 'dana.white@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Eve Black',
      email: 'eve.black@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const usersWithTheRole = this.users.filter((user) => user.role === role);
      if (usersWithTheRole.length === 0)
        throw new NotFoundException('User role not found');
      return usersWithTheRole;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighesId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighesId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
  }

  updateOne(id: number, UpdatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...UpdatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteOne(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
