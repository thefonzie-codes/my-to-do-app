import { TimePicker } from "@mui/x-date-pickers";
import { useAppData } from "../App";
import { Form } from "react-router-dom";
import Dayjs from "dayjs";

export default function UserSettings() {

  const { user } = useAppData();
  const { email, username } = user;


  return (
    <>
      <Form
        onSubmit={(evt) => {
          evt.preventDefault();
        }}>
        <label>Username:</label>
        <input
          type='text'
          placeholder={username}
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
          defaultValue={Dayjs()}
        />
        <label>Check-in Time:</label>
      </Form>
    </>
  );
}
