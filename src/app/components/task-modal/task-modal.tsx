'use client';
import {Status} from "@/app/modules/status";
import {useEffect, useState} from "react";
import {Task} from "@/app/modules/task";

export interface AddTaskModalProps {
    isOpen: boolean;
    task: Task;
    onClose: () => void;
}

export default function TaskModal({isOpen, task, onClose}: AddTaskModalProps) {

    const [newTask, setNewTask] = useState<Task>(task);
    const status = [{value: Status.TODO, name: "To Do"},
        {value: Status.IN_PROGRESS, name: "In Progress"},
        {value: Status.DONE, name: "Done"}];

    useEffect(() => {
        setNewTask(task);
    }, [task]);

    function submitTask() {

    }

    return (<>
            {isOpen && <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <form onSubmit={submitTask}
                  className="block bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-xl
             max-h-[calc(100vh-2rem)] overflow-auto">
                <div id="header" className="flex w-full justify-between border-b border-gray-700 px-6 py-4">
                    <h1 className="text-2xl font-semibold">Add Task</h1>
                    <button
                        className="text-gray-400 hover:text-white text-2xl leading-none cursor-pointer"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div id="body" className="px-6 py-4 space-y-4">
                    <div>
                        <label htmlFor="title" className="block font-medium">Title:</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            value={newTask.title}
                            onChange={(event) => setNewTask({...task, title: event.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            className="w-full h-[200px] bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                            value={newTask.description}
                            onChange={(event) => setNewTask({...task, description: event.target.value})}
                        />
                    </div>
                    <div>
                        <label id="status">Status:</label>
                        <select name="description"
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                value={newTask.status}
                                onChange={(event) => setNewTask({...task, description: event.target.value})}>
                            {status.map((item) => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex w-full justify-end border-t border-gray-700 px-6 py-4 space-x-4">
                    <button
                        type="button"
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white cursor-pointer"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white cursor-pointer">
                        Save
                    </button>
                </div>
            </form>
        </div>}
        </>
    );
}