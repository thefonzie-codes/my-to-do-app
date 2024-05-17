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
  id?: string
  name: string
  description?: string
  due_date: string | Date
  selectedDate? : Date
  completed?: boolean
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