import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/reducers/session";
import "./ProfileButton.css";
import { useNavigate } from "react-router-dom";
import person from "../../assets/image/ghostPerson.svg";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const sessionUser = useSelector((state) => state.session.user);

  const navigate = useNavigate();
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/profile/${sessionUser.id}`);
  };
  return (
    <div className="profile-button-container">
      <button className="dropDownBtn" onClick={toggleMenu}>
        <img
          src={sessionUser.photoUrl || person}
          width={30}
          height={30}
          className="img"
        />
        <div className="img"></div>
        <h6>Me</h6>
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li>
            <div className="profileName">
              <img
                src={sessionUser.photoUrl || person}
                width={60}
                height={60}
                className="img"
              />
              <span className="user">
                {sessionUser.fname} {sessionUser.lname}
              </span>
            </div>
          </li>
          <li>
            <a className="linkProfile" onClick={handleClick}>
              View Profile
            </a>
          </li>
          <li>
            {/* {user.username} */}
            <button onClick={(e) => logout(e)} className="signOut">
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
