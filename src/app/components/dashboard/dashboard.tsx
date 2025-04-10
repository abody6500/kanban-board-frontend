'use client';
import {Column} from '@/app/modules/column';
import ColumnComponent from '@/app/components/column/column';
import {Task} from '@/app/modules/task';
import {Status} from '@/app/modules/status';
import {useState} from 'react';
import {DndContext, DragEndEvent, DragStartEvent, MouseSensor, useSensor} from '@dnd-kit/core';
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import TaskModal from "@/app/components/task-modal/task-modal";

export default function DashBoardComponent() {
    const demoTasks: Task[] = [
        {
            id: 1,
            title: 'Design the UI for the Task Board',
            status: Status.TODO,
            description: 'Design the user interface for the task management board with clear sections.',
            subTasks: []
        },
        {
            id: 2,
            title: 'Implement Task Drag-and-Drop',
            status: Status.IN_PROGRESS,
            description: 'Implement the drag-and-drop functionality for tasks.',
            subTasks: []
        },
        {
            id: 3,
            title: 'Set Up User Authentication',
            status: Status.DONE,
            description: 'Set up the authentication system using OAuth 2.0.',
            subTasks: []
        },
        {
            id: 4,
            title: 'Write Unit Tests for Task Component',
            status: Status.IN_PROGRESS,
            description: 'Write unit tests for the task component in React.',
            subTasks: [
                {
                    id: 6,
                    title: 'Test task creation',
                    status: Status.TODO,
                    description: 'Write tests for creating a new task.',
                    subTasks: []
                },
                {
                    id: 7,
                    title: 'Test task deletion',
                    status: Status.TODO,
                    description: 'Write tests for deleting a task.',
                    subTasks: []
                }
            ]
        },
        {
            id: 5,
            title: 'Deploy Application to Production',
            status: Status.TODO,
            description: 'Deploy the task management app to the production server.',
            subTasks: []
        }
    ];

    const demoColumns: Column[] = [
        {id: Status.TODO, name: 'To Do'},
        {id: Status.IN_PROGRESS, name: 'In Progress'},
        {id: Status.DONE, name: 'Done'}
    ];

    const initailTask = {
        status: Status.TODO,
        description: "",
        title: "",
        subTasks: []
    }
    const [tasks, setTasks] = useState<Task[]>(demoTasks);
    const [columns, setColumns] = useState<Column[]>(demoColumns);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [task, setTask] = useState<Task>(initailTask)
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 0,
            delay: 5000
        },
    });
    const openModal = (task: Task) => {
        setTask(task);
        setIsOpen(true);
    }

    const closeModal = () => {
        setTask(initailTask);
        setIsOpen(false)
    }
    const  handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over) {
            return;
        }
        const taskId = active?.id;
        const newStatus = over.id as Task['status'];

        setTasks(() => tasks.map(task => task.id === taskId ? {...task, status: newStatus} : task));
    }

    return (
        <div className="h-screen p-6 md:overflow-hidden">
            <TaskModal
                isOpen={isOpen}
                task={task}
                onClose={closeModal}
            />
            <div className="flex w-full justify-end">
                <button className="rounded-lg border border-gray-400 px-4 py-2 cursor-pointer float-right"
                        onClick={() => setIsOpen(true)}>Add Task</button>
            </div>
            <DndContext onDragEnd={handleDragEnd}
                        modifiers={[restrictToWindowEdges]}
                        sensors={[mouseSensor]}
            >
                <div className="flex place-content-between h-full space-x-4 mt-8">
                    {columns.map((column: Column) => (
                        <div key={column.id}
                             className="flex-1">
                            <ColumnComponent
                                column={column}
                                tasks={tasks.filter(task => task.status === column.id)}
                                openModal={(task) => openModal(task)}
                            />
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>

    );
}