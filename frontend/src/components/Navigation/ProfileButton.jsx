import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/reducers/session";
import "./ProfileButton.css";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const sessionUser = useSelector((state) => state.session.user);

  const navigate = useNavigate();
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
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

  return (
    <div className="profile-button-container">
      <button className="dropDownBtn" onClick={toggleMenu}>
        <i className="fa-solid fa-user-circle s" />
        <h6>Me</h6>
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li>
            <div className="profileName">
              <i className="fa-solid fa-user-circle fa-3x" />
              <span className="user">{sessionUser.username}</span>
            </div>
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
