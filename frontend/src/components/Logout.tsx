import { LOGOUT } from "../hooks/helpers";

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