export default function LogIn() {
  return (
    <div className="modal-bg">
      <div className="LogIn modal">
        <form>
          <input
            type='text'
            label='username'
            placeholder="Username"
            maxLength="100">
          </input>
          <input
            type='password'
            label='password'
            placeholder="Password"
            maxLength="100">
          </input>
          <button type='submit'>Log In</button>
        </form>
        <button>Cancel</button>
      </div>
    </div>
  );
}