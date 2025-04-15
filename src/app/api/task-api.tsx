import { Task } from '@/app/modules/task';
import { User } from '@/app/modules/user';

export async function getTaskById(id: string): Promise<Task> {
    return fetch(`${process.env.API_BASE_URL}/api/taskcard/${id}`,
        {
            method: 'GET'
        })
        .then(data => {
            if(data.ok){
                return data.json();
            }
        }).catch(error => {
            console.error(`Error: Task card with ID ${id} was not found`, error.message);
            throw error;
        });
}

export async function getTaskCards(): Promise<User[]> {
    return await fetch(`${process.env.API_BASE_URL}/api/users`, {
        method: 'GET'
    }).then(data => {
        if(data.ok){
            return data.json();
        }
    }).catch(error => {
        console.error('Error:', error.message);
        throw error;
    });

}