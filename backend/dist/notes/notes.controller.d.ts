import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(createNoteDto: CreateNoteDto, req: any): Promise<import("./note.entity").Note>;
    findAll(req: any): Promise<import("./note.entity").Note[]>;
    findOne(id: string, req: any): Promise<import("./note.entity").Note>;
    update(id: string, updateNoteDto: UpdateNoteDto, req: any): Promise<import("./note.entity").Note>;
    remove(id: string, req: any): Promise<void>;
}
