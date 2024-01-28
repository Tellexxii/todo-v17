export interface Todo {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    isDone: boolean;
    priority: Priority
}

export enum Priority {
    None,
    Low,
    Normal,
    Urgent
}

export const priorityLocalize: Record<Priority, string> = {
    [Priority.None]: 'None',
    [Priority.Low]: 'Low',
    [Priority.Normal]: 'Normal',
    [Priority.Urgent]: 'Urgent'
}

export type TodoForm = Pick<Todo, 'title' | 'description' | 'priority'>
