import Navigation from "../Navigation/Navigation";
import LoginForm from "../session/LoginForm";
import "./splash.css";

const splash = () => {
  return (
    <div className="main">
      <div className="logo">
        <Navigation />
      </div>
      <div className="log-container">
        <div className="loginPage">
          <LoginForm />
        </div>
        <div className="log-img">
          <img
            src="	https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
            alt="logo"
            className="log-img"
          />
        </div>
      </div>
    </div>
  );
};

export default splash;
