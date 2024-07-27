import { useAppData } from "../App";
import { Form } from "react-router-dom";

export default function UserSettings() {

  const { user } = useAppData();
  const { email, username } = user;

  return (
    <form>
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
          <label>Check-in Time:</label>
      </Form>
    </form>
  )
}
