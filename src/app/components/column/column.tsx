import { Task } from '@/app/modules/task';
import { Column } from '@/app/modules/column';
import TaskComponent from '@/app/components/task/task';
import { useDroppable } from '@dnd-kit/core';

interface ColumnComponentProps {
    column: Column;
    tasks: Task[];
    openModal: (task:Task) => void;
}

export default function ColumnComponent({ column, tasks, openModal }: ColumnComponentProps): any {
    const {setNodeRef} = useDroppable({
        id: column.id,

    })

    return (
            <div ref={setNodeRef} key={ column.id } className="rounded-lg p-4 h-full">
                <h1 className="text-center">{ column.name }</h1>
                <div >
                    {tasks.map((task: Task) => (
                        <TaskComponent key={task.id} data={ task } openModal={(task) => openModal(task)}></TaskComponent>
                    ))}
                </div>
            </div>
    );
}