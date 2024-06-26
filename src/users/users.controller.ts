import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() // users
  findAll(@Query('sex') Gender?: 'INTERN' | 'ENGINEER' | 'ADMIN'): any {
    return this.userService.findAll(Gender);
  }

  @Get('interns') // /users/interns
  findAllInterns(@Query('sex') Gender?: 'MALE' | 'FEMALE') {
    return `Gender is ${Gender}`;
  }

  @Get(':id') // /users/:id
  findOne(@Param('id') id: string): any {
    return this.userService.findOne(+id);
  }

  @Post()
  createUsers(@Body() User: any) {
    return this.userService.create(User);
  }

  @Patch(':id') // /users/:id
  updateuser(@Param('id') id: string, @Body() userUpdate: any): any {
    return this.userService.updateOne(+id, userUpdate);
  }

  @Delete(':id') // /users/:id
  deleteuser(@Param('id') id: string): any {
    return this.userService.deleteOne(+id);
  }
}
