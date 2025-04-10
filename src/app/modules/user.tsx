import { Task } from 'next/dist/client/components/router-reducer/ppr-navigations';

export interface User {
    id: number;
    name: string;
    profileImage: string;
    tasks: Task[];
}