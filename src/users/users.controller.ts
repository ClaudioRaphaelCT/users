/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Headers, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  findAll(@Headers() headers) {
    return this.userService.findAll(headers);
  }
  @Get('/username')
  findOne(@Body() username) {
    return this.userService.findUsername(username);
  }
  @Delete('/username')
  deleteUser(@Body() username) {
    return this.userService.deleteUser(username);
  }
}
