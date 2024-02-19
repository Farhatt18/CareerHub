import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/reducers/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/feed" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          fname,
          lname,
          password,
        })
      ).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
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

  const handleLogBtn = (e) => {
    e.preventDefault();
    navigate("/");
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
              {errors.map((error, index) => (
                <li key={index}>{error.message || error}</li>
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
              First Name
              <input
                type="text"
                autoComplete="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                autoComplete="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
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
            <button className="session-redirect" onClick={handleLogBtn}>
              Already on CareerHub? Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
