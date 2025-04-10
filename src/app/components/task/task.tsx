'use client';
import { Task } from '@/app/modules/task';
import { useDraggable } from '@dnd-kit/core';

export interface TaskComponentProps {
    data: Task;
    openModal: (task: Task) => void;
}

export default function TaskComponent({ data, openModal }: TaskComponentProps): any {
    const { listeners, setNodeRef, attributes, transform } = useDraggable({
        id: data.id as number
    });

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    } : undefined;

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className="bg-gray-800 rounded-lg border-4 border-black mt-2 p-4 cursor-pointer" style={style}>
            <div className="w-fit hover:underline decoration-1" onClick={() => openModal(data)}>{data.title}</div>
        </div>
    );
}