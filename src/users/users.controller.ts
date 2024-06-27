import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() // users
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): any {
    return this.userService.findAll(role);
  }

  @Get('interns') // /users/interns
  findAllInterns(@Query('sex') Gender?: 'MALE' | 'FEMALE') {
    return `Gender is ${Gender}`;
  }

  @Get(':id') // /users/:id
  findOne(@Param('id', ParseIntPipe) id: number): any {
    return this.userService.findOne(id);
  }

  @Post()
  createUsers(@Body(ValidationPipe) UserDto: CreateUserDto) {
    return this.userService.create(UserDto);
  }

  @Patch(':id') // /users/:id
  updateuser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDto: UpdateUserDto,
  ): any {
    return this.userService.updateOne(id, userDto);
  }

  @Delete(':id') // /users/:id
  deleteuser(@Param('id', ParseIntPipe) id: number): any {
    return this.userService.deleteOne(id);
  }
}
