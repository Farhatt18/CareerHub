import { useState } from "react";
import * as sessionActions from "../../store/reducers/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/feed" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };
  const handleSignBtn = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  const handleDemo = async (e) => {
    e.preventDefault();
    setCredential("Demo-lition");
    setPassword("password");

    dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  return (
    <div className="login-container">
      <div className="log-container">
        <div className="log-ele">
          <h1> Welcome to the start of your professional journey!</h1>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error.message || error}</li>
              ))}
            </ul>
            <label> Email or username </label>
            <input
              type="text"
              value={credential}
              autoComplete="username"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <label> Password </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
          <button className="demo-button" onClick={handleDemo}>
            Demo user
          </button>
          <div className="signUp">
            <button className="session-redirect" onClick={handleSignBtn}>
              New to CareerHub? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
