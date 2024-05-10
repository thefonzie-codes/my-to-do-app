export interface User {
  username: string,
  email: string,
  id: string,
}

export interface ToDoItem {
  id: string,
  name: string,
  description: string,
  dueDate: string,
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

// export declare function useOutletContext<
//   Context = unknown
// >(): Context;