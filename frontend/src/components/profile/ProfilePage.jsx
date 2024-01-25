import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import "./ProfilePage.css";

import * as modalActions from "../../store/reducers/modals";
import { Navigate } from "react-router-dom";
import PostModal from "../posts/PostModal";

import PostIndex from "../posts/PostsIndex";

const ProfilePage = () => {
  const user = useSelector((state) => state.session.user);
  const modalType = useSelector((state) => state.modals.type === "SHOW_MODAL");
  const dispatch = useDispatch();

  if (!user) return <Navigate to="/" />;

  // const handlePhoto = () => {
  //   dispatch(modalActions.showModal("SHOW_MOODAL"));
  // };

  const openPostModal = () => {
    dispatch(modalActions.showModal("SHOW_MODAL"));
  };

  return (
    <div className="profilePageWrapper">
      <div className="profilePageHeader">
        <Navigation />
      </div>
      <div className="profilePageContainer">
        <div className="profileBody">
          <div className="imgWrapper">
            <div className="profilePhoto"></div>
            <button className="profileCamera"></button>
            <div className="userHeader">
              <div className="currentUser">
                <h1>
                  {user.fname} {user.lname}
                </h1>
              </div>
              {/* <h2>Status</h2> */}
            </div>
          </div>
          <div className="activityBox">
            <div className="activityHeader">
              <div className="activity">Activity</div>
              <div onClick={openPostModal}>
                <a>Create a post</a>
              </div>
              {modalType && <PostModal userName={user.username} />}
            </div>
            <div>
              <PostIndex type={"profile"} userId={user.id} />
            </div>
          </div>

          <div className="experienceBox">
            <div className="experienceHeader">
              <div className="experience">Experience</div>
              <button className="addBtn">
                <svg width={24} height={24}>
                  <path
                    d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"
                    width={18}
                    height={18}
                  ></path>
                </svg>
              </button>
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
