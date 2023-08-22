/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/user.dto';
import { users } from './database/users.db';
import { msg1, msg2, msg3, msg4, msg5, msg6 } from './utils/users.msg';
import { Adm_user, Adm_password } from './utils/user.secrets';

@Injectable()
export class UserService {
  private users: Users[] = users;
  private ADMIN_USER = Adm_user;
  private ADMIN_PASSWORD = Adm_password;

  createUser(userDto: CreateUserDto) {
    const existsUser = this.users.some((user) => user.name === userDto.name);
    if (existsUser) {
      throw new HttpException(msg1, HttpStatus.FOUND);
    }
    this.users.push(userDto);
    throw new HttpException(msg2, HttpStatus.CREATED);
  }
  findAll(headers) {
    const auth = headers['usuario'];
    const password = headers['senha'];
    if (auth !== this.ADMIN_USER || password !== this.ADMIN_PASSWORD) {
      throw new HttpException(msg3, HttpStatus.UNAUTHORIZED);
    }
    return this.users;
  }
  findUsername(username: CreateUserDto) {
    const searchUser = this.users.find((user) => user.name === username.name);
    if (!searchUser) {
      throw new HttpException(msg4, HttpStatus.NOT_FOUND);
    }
    return searchUser;
  }
  deleteUser(username: CreateUserDto) {
    const userIndex = this.users.findIndex(
      (user) => user.name === username.name,
    );
    if (userIndex === -1) {
      throw new HttpException(msg5, HttpStatus.NOT_FOUND);
    }
    this.users.splice(userIndex, 1); 
    throw new HttpException(msg6, HttpStatus.OK);
  }
}
