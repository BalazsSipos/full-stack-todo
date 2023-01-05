import { User } from "../../user/models/User";

export interface Todo {
    id: string;
    title: string;
    description: string;
    category: string;
    completed: boolean;
    location: string;
    progress: number
    startingDate: string;
    createdAt: string;
    createdBy: User;
    performedBy: User;
}