import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note created successfully' })
  create(@Body(ValidationPipe) createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes for current user' })
  @ApiResponse({ status: 200, description: 'Returns all user notes' })
  findAll(@Request() req) {
    return this.notesService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note' })
  @ApiResponse({ status: 200, description: 'Returns the note' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.notesService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({ status: 200, description: 'Note updated successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateNoteDto: UpdateNoteDto, @Request() req) {
    return this.notesService.update(+id, updateNoteDto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({ status: 200, description: 'Note deleted successfully' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.notesService.remove(+id, req.user.userId);
  }
}