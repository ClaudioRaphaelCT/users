/* eslint-disable prettier/prettier */
import { IsNotEmpty, Min, IsInt, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Min(18)
  @IsInt()
  age: number;

  @IsNotEmpty()
  @Length(5, 10) //Minimo e máximo
  password: string;
}
