import { Note } from '../notes/note.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    notes: Note[];
}
