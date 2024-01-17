import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/reducers/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/feed" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
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
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signUpPageWrapper">
      <div className="nav">
        <NavLink to="/" className="navbar-logo">
          Career<span>hub</span>
        </NavLink>
      </div>
      <div className="signup-info">
        <div className="signheader">
          <h1>Make every career moment count</h1>
        </div>
        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error.message}</li>
              ))}
            </ul>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Username
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
            <p className="session-redirect">
              Already on CareerHub?&#160;
              <Link to="/" style={{ textDecoration: "none" }}>
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
