export interface User {
  username: string,
  email: string,
  id: string,
}

export interface ToDoItem {
  id: string,
  name: string,
  description?: string,
  due_date: string | Date,
  completed?: boolean,
}

export type TaskData = {
  id?: string | undefined,
  name: string | undefined,
  description?: string | undefined,
  due_date?: string | Date | undefined,
  selectedDate? : Date | null,
  completed?: boolean | undefined
}


export type ToDoList = Array<{
  id: string,
  name: string,
  description: string,
  due_date: string,
  completed: boolean,
}>

export interface ToDoItemProps {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  due_date: string;
}