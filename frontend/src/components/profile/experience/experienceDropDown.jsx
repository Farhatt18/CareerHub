import { useDispatch, useSelector } from "react-redux";
import { deleteExperience } from "../../../store/reducers/experience";
import { useState } from "react";
// import edit from "../../../assets/image/pencil.png";
import trash from "../../../assets/image/trash.png";
import "./experienceDropDown.css";
import { useParams } from "react-router-dom";
// import Modal from "../../Modal/modal";

const ExperienceDropDown = ({ experienceId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("sessionUser", sessionUser);
  // console.log("sessionUserId", sessionUser.id);
  const { userId } = useParams();
  // console.log("userId", userId);
  const user = useSelector((state) => state.users[userId]);
  // console.log("User", user);
  const [showDropDown, setShowDropDown] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

  const handleDropDownToggle = () => {
    setShowDropDown((prevShowDropDown) => !prevShowDropDown);
  };

  const handleDelete = () => {
    dispatch(deleteExperience(experienceId));
    setShowDropDown(false);
  };

  return (
    <div className="experienceDropDown">
      {sessionUser.id === user.id && (
        <button className="dropDownBtn" onClick={handleDropDownToggle}>
          ...
        </button>
      )}
      {showDropDown && (
        <div className="dropDownOptions">
          <>
            {/* <div className="editBox">
              <button onClick={() => setIsEditing(true)}>
                <img src={edit} width={20} height={20} alt="pencil" />
                Edit Post
              </button>
            </div> */}
            {/* {isEditing && (
              <Modal>

              </Modal>
            )} */}
            <div className="deleteBox">
              <button onClick={handleDelete}>
                <img src={trash} width={20} height={20} alt="trash" /> Delete
                Experience
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default ExperienceDropDown;
