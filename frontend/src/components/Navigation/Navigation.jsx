import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import github from "../../assets/image/github.png";
import linkedin from "../../assets/image/linkedin.png";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  const loggedOutHeader = (
    <div className="header">
      <NavLink to="/" className="navbar-logo">
        Career<span>hub</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink to={"/"} className="login-button" activeclassname="active">
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
    <div className="header">
      <div className="logo">
        <NavLink to={"/feed"} className="navbar-logo">
          Career<span>hub</span>
        </NavLink>
      </div>
      <div className="navbar-links">
        {/* <div className="aboutLinks"> */}
        <a
          className="github"
          href="https://github.com/Farhatt18"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="githublogo" width={30} />
        </a>
        <a
          className="linkedin"
          href="https://www.linkedin.com/in/farhat-sumaiya-4704b11a3/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="linkedin logo" width={30} />
        </a>

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
      {sessionUser && (
        <header className="navbar">
          <div className="navbar-container">
            {sessionUser ? loggedInHeader : loggedOutHeader}
          </div>
        </header>
      )}
      {!sessionUser && (
        <nav className="nav">
          <div className="navbarNotLogged">
            {!sessionUser ? loggedOutHeader : loggedInHeader}
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
