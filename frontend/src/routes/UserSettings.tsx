import { TimePicker } from "@mui/x-date-pickers";
import { useAppData } from "../App";
import { Form } from "react-router-dom";
import Dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";

import { User } from "../../types.ts"
import { useState } from "react";
import dayjs from "dayjs";
import axios from "../api/axios";

dayjs.extend(customParseFormat);

export default function UserSettings() {

  const navigate = useNavigate();

  const { user } = useAppData();
  const { email, username, reminder, id, check_in } = user;

  const [userSettings, setUserSettings] = useState<User>({
    id: id,
    username: username,
    email: email,
    reminder: reminder,
    check_in: check_in,
  })

  const EDIT_USER = async (userSettings: User) => {
    try {
      const response = await axios.put('edit_user/', userSettings);
      console.log(response.data)
      return response.data;
    }
    catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <>
      <Form
        onSubmit={(evt) => {
          evt.preventDefault();
          EDIT_USER(userSettings);
        }}>
        <label>Username:</label>
        <input
          type='text'
          placeholder={userSettings.username}
          onChange={(evt) => setUserSettings({...userSettings, username: evt.target.value})}
          maxLength={50}>
        </input>
        <label>Email:</label>
        <input
          type='text'
          placeholder={email}
          maxLength={50}>
        </input>
        <label>Notificiation Time:</label>
        <TimePicker
          value={Dayjs(reminder, "HH:mm:ss")}
          onChange={(evt) => {
            const newTime = Dayjs(evt).format("HH:mm:ss")
            setUserSettings({...userSettings, reminder: newTime})
          }}
        />
        <label>Check-in Time:</label>
        <TimePicker
          value={Dayjs(check_in, "HH:mm:ss")}
          onChange={(evt) => {
            const newTime = Dayjs(evt).format("HH:mm:ss")
            setUserSettings({...userSettings, check_in: newTime})
          }}
        />
        <button >Save</button>
        <button onClick={() => navigate('/dashboard')}>Cancel</button>
      </Form>
    </>
  );
}
