import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAlignJustify, faIndent } from '@fortawesome/free-solid-svg-icons';

import { EDIT_ITEM, daysUntilDueCount, DELETE_ITEM, GET_ITEMS_BY_USER } from "../hooks/helpers";
import { useAppData } from "../App";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskData } from "../../types";

export default function EditItem() {

  const params = useParams();

  const navigate = useNavigate();

  const formattedDate = (date: any) => Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  
  const { toDoList, setToDoList } = useAppData();

  const [taskData, setTaskData] = useState<TaskData>({
    name: "",
    description: "",
    completed: false,
    due_date: new Date(),
    selectedDate: new Date(),
    id: undefined
  });

  const taskId = taskData?.id;

  useEffect(() => {
    const itemId = (params.ItemId ?? parseInt(params.itemId ?? ''));
    const task = toDoList.find((item) => item.id == itemId);
    if (task === undefined) {
      alert("Task not found");
      navigate('/dashboard');
      return;
    }
    setTaskData({...task, selectedDate: new Date(task.due_date)});
  }, []);

  const HANDLE_EDIT = async () => {
    try {
      if (taskData) {
        await EDIT_ITEM(taskData);
        const updatedList = await GET_ITEMS_BY_USER();
        setToDoList(updatedList);
        navigate('/dashboard');
        window.location.reload();
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const HANDLE_DELETE = async () => {
    try {
      await DELETE_ITEM(taskId);
      const updatedList = await GET_ITEMS_BY_USER();
      setToDoList(updatedList);
      navigate('/dashboard');
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <div className="modal">
        <form
          onSubmit={(evt) => {
            if (taskData === undefined) {
              evt.preventDefault();
              alert("Task data is undefined");
              return;
            }
            if (taskData.name === "" || taskData.name === undefined || taskData.name === null) {
              evt.preventDefault();
              alert("Please enter a title for the task");
              return;
            }
            if (daysUntilDueCount(taskData.due_date) < 0) {
              evt.preventDefault();
              alert("Please enter a due date of today or in the future");
              return;
            }
            HANDLE_EDIT();
            navigate('/dashboard');
          }}>
          <label><FontAwesomeIcon icon={faAlignJustify} />  Title:</label>
          <input
            value={taskData.name}
            id="taskName"
            type='text'
            maxLength={100}
            onChange={(evt) => setTaskData({ ...taskData, name: evt.target.value })}>
          </input>
          <label><FontAwesomeIcon icon={faIndent} />  Description:</label>
          <input
            value={taskData.description}
            id="taskDescription"
            type="text"
            onChange={(evt) => setTaskData({ ...taskData, description: evt.target.value })}
          >
          </input>
          <label><FontAwesomeIcon icon={faCalendar} />  Due Date:</label>
          <DatePicker
            selected={taskData.selectedDate}
            onChange={(date) => {
              if (date) {
                setTaskData({ ...taskData, due_date: formattedDate(date), selectedDate: date });
              }
            }}
            onSelect={(date) => {
              if (date) {
                setTaskData({ ...taskData, due_date: formattedDate(date), selectedDate: date });
              }
            }}
          />
          <div className="options">
            <button type='submit'>Save</button>
            <button type='button' className="delete" onClick={() => HANDLE_DELETE()}>Delete</button>
            <button onClick={() => navigate('/dashboard')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}