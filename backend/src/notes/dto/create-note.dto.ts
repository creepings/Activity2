import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My First Note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the content of my note' })
  @IsString()
  @IsNotEmpty()
  content: string;
}