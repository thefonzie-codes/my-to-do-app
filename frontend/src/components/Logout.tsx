import { LOGOUT } from "../hooks/helpers";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  
  LOGOUT();
  setTimeout(() => {
    window.location.reload();
  }, 2000);

  return (
    <div>
      You are now logged out.
    </div >
  );
}