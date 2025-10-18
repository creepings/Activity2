import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private notesRepository;
    constructor(notesRepository: Repository<Note>);
    create(createNoteDto: CreateNoteDto, userId: number): Promise<Note>;
    findAllByUser(userId: number): Promise<Note[]>;
    findOne(id: number, userId: number): Promise<Note>;
    update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<Note>;
    remove(id: number, userId: number): Promise<void>;
}
