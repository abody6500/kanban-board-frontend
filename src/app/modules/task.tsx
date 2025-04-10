import { Status } from '@/app/modules/status';

export interface Task {
    id?: number;
    title: string;
    status: Status;
    description: string;
    subTasks: Task[];
}