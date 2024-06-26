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

@Controller('users')
export class UsersController {
  @Get() // users
  findAll() {
    return [];
  }

  @Get('interns') // /users/interns
  findAllInterns(@Query('sex') Gender?: 'MALE' | 'FEMALE') {
    return `Gender is ${Gender}`;
  }

  @Get(':id') // /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  createUsers(@Body() User: NonNullable<unknown>) {
    return User;
  }

  @Patch(':id') // /users/:id
  updateuser(@Param('id') id: string, @Body() userUpdate: object) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // /users/:id
  deleteuser(@Param('id') id: string) {
    return `User removed ${id}`;
  }
}
