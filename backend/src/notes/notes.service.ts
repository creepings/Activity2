import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    const note = this.notesRepository.create({
      ...createNoteDto,
      user: { id: userId },
    });
    return this.notesRepository.save(note);
  }

  async findAllByUser(userId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<Note> {
    const note = await this.findOne(id, userId);
    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }

  async remove(id: number, userId: number): Promise<void> {
    const note = await this.findOne(id, userId);
    await this.notesRepository.remove(note);
  }
}