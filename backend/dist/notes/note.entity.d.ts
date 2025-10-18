import { User } from '../users/user.entity';
export declare class Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
