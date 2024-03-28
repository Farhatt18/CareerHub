// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./ProfilePage.css";
import * as modalActions from "../../store/reducers/modals";
import * as usersActions from "../../store/reducers/users";
import PostModal from "../posts/PostModal";
import PostIndex from "../posts/PostsIndex";
import ExperienceModal from "./experience/experienceModal";
import ExperienceIndex from "./experience/experienceIndex";
import github from "../../assets/image/github.png";
import linkedin from "../../assets/image/linkedin.png";
import pencil from "../../assets/image/editPencil.png";
import CoverPicModal from "./coverPicModal";
import { useEffect } from "react";
import ProfileModal from "./profileModal";
// import { selectUserById } from "../../store/reducers/users";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const modalType = useSelector((state) => state.modals.type);
  const { userId } = useParams();
  // console.log("userID", userId);
  // const user = useSelector(selectUserById(userId));
  const user = useSelector((state) => state.users[userId]);
  // console.log("user", user);

  useEffect(() => {
    dispatch(usersActions.fetchuser(userId));
  }, [dispatch, userId]);

  if (!sessionUser) {
    return <Navigate to="/" />;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleCover = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("COVER_MODAL"));
  };

  const handlePhoto = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("PROFILE_MODAL"));
  };

  const openPostModal = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("SHOW_MODAL"));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("ADD_EXPERIENCE"));
  };

  return (
    <div className="profilePageWrapper">
      <div className="profilePageHeader">
        <Navigation />
      </div>
      <div className="profilePageContainer">
        <div className="profileBody">
          <div className="imgWrapper">
            <div className="coverPhotoContainer" onClick={handleCover}>
              <img src={user.coverPic} className="profilePhoto" alt="Cover" />
              <img src={pencil} width={20} className="pencil" alt="Edit" />
            </div>
            {modalType === "COVER_MODAL" && <CoverPicModal />}
            <div onClick={handlePhoto}>
              <img
                src={user.photoUrl}
                className="profileCamera"
                alt="Profile"
              />
            </div>
            {modalType === "PROFILE_MODAL" && <ProfileModal />}

            <div className="userHeader">
              <div className="currentUser">
                <h1>
                  {user.fname} {user.lname}
                </h1>
              </div>

              <div className="aboutLinks">
                <a
                  className="github"
                  href="https://github.com/Farhatt18"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={github} alt="GitHub Logo" width={30} />
                </a>
                <a
                  className="linkedin"
                  href="https://www.linkedin.com/in/farhat-sumaiya-4704b11a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="LinkedIn Logo" width={30} />
                </a>
              </div>
            </div>
          </div>
          <div className="activityBox">
            <div className="activityHeader">
              <div className="activity">Activity</div>
              <div onClick={openPostModal}>
                <a>Create a post</a>
              </div>
            </div>
            {modalType === "SHOW_MODAL" && (
              <PostModal userName={user.username} />
            )}
            <div>
              <PostIndex type={"profile"} userId={user.id} />
            </div>
          </div>

          <div className="experienceBox">
            <div className="experienceHeader">
              <div className="experience">Experience</div>
              <button className="addBtn" onClick={handleAdd}>
                <svg width={24} height={24}>
                  <path
                    d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"
                    width={18}
                    height={18}
                  ></path>
                </svg>
              </button>
            </div>
            {modalType === "ADD_EXPERIENCE" && (
              <ExperienceModal userId={user.id} />
            )}
            <div>
              <ExperienceIndex userId={user.id} />
            </div>
          </div>
        </div>
        <div className="sideBar">
          <p>Profile language</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
