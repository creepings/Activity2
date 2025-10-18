import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}