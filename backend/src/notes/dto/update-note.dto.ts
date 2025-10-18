import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({ example: 'Updated Title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Updated content', required: false })
  @IsString()
  @IsOptional()
  content?: string;
}