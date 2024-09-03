export interface Task {
    _id: string;
    title: string;
    description: string;
    reward: number;
    type: TaskType;
    link: string;
    imageBase64: string;
    completed: boolean;

}

export enum TaskType {
    telegramGroup = "telegramGroup"
}