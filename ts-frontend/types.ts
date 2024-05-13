export interface User {
  username: string,
  email: string,
  id: string,
}

export interface ToDoItem {
  id: string,
  name: string,
  description: string,
  due_date: string,
  completed: boolean,
}

export interface AddToDoItem {
  name: string,
  description: string,
  due_date: string,
  completed: boolean,
}


export type ToDoList = Array<{
  id: string,
  name: string,
  description: string,
  dueDate: string,
  completed: boolean,
}>

export interface ToDoItemProps {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  dueDate: string;
}