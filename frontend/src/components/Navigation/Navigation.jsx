import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import LoginForm from "../session/LoginForm";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  // const sessionLinks = sessionUser ? (
  //   <li>
  //     <ProfileButton user={sessionUser} />
  //   </li>
  // ) : (
  //   <>
  //     <NavLink to="/login">Log In</NavLink>
  //     <NavLink to="/signup">Sign Up</NavLink>
  //   </>
  // );

  const loggedOutHeader = (
    <div className="header">
      <NavLink to="/" className="navbar-logo">
        Career<span>Hub</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to={"/login"}
          className="login-button"
          activeclassname="active"
        >
          Log In
        </NavLink>
        <NavLink
          to={"/signup"}
          className="signup-button"
          activeclassname="active"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
  const loggedInHeader = (
    <div className="header-logged">
      <div className="logo">
        <NavLink to="/" className="navbar-logo">
          <span>Hub</span>
        </NavLink>
      </div>
      <div className="navbar-links">
        <ProfileButton user={sessionUser} />
      </div>
    </div>
  );

  return (
    // <>
    // {/* <NavLink to="/">Home</NavLink>/ */}
    // {/* <h1 className="heading">
    // Welcome to the start of your professional journey!
    // </h1> */}
    // {/* {sessionLinks} */}
    // {/* </> */}

    <>
      <nav className="navbar">
        <div className="navbar-container">
          {sessionUser ? loggedInHeader : loggedOutHeader}
        </div>
      </nav>
      {/* <LoginForm /> */}
    </>
  );
}

export default Navigation;
