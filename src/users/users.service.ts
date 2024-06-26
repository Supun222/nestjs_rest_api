import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'user',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'user',
    },
    {
      id: 4,
      name: 'Dana White',
      email: 'dana.white@example.com',
      role: 'moderator',
    },
    {
      id: 5,
      name: 'Eve Black',
      email: 'eve.black@example.com',
      role: 'user',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: User) {
    const usersByHighesId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighesId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
  }

  updateOne(id: number, UpdatedUser: User) {
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
