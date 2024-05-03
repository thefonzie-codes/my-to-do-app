import React from 'react';

// Define the structure of the state object passed to the LogIn component
interface LogInState {
  user?: any;  // You might want to define a more specific type
  list?: any;  // As above, specify the actual expected type
  view: string;
}

// Define the props for the LogIn component
interface LogInProps {
  state: LogInState;
  setState: React.Dispatch<React.SetStateAction<LogInState>>;
}

// Declare the LogIn component as a default export with the LogInProps type
declare const LogIn: React.ComponentType<LogInProps>;
export default LogIn;
