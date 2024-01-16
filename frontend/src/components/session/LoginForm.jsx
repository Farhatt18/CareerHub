import { useState } from "react";
import * as sessionActions from "../../store/reducers/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
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

  const handleDemo = async (e) => {
    e.preventDefault();
    setCredential("Demo-lition");
    setPassword("password");
    // await handleSubmit(e);
  };

  return (
    // <div className="login">
    //   <div className="header-container">
    //     <h1> Welcome Back </h1>
    //     <p className="subheader">
    //       Stay connected with your professional world. Sign in now to embrace
    //       your next opportunity.
    //     </p>
    //   </div>
    <div className="login-container">
      <div className="log-container">
        <div className="log-ele">
          <h1> Welcome to the start of your professional journey!</h1>
          {/* <p className="subheader">
        Stay connected with your professional world. Sign in now to embrace your
        next opportunity.
      </p> */}

          <form className="loginForm" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>
          </form>
          <button className="demo-button" onClick={handleDemo}>
            Demo user
          </button>
          <p className="session-redirect">
            New to CareerHub?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>
        </div>
        <img
          src="	https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
          alt="logo"
          className="log-img"
        />
      </div>
    </div>
  );
}

export default LoginForm;
