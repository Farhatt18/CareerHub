import "./feed.css";
import Navigation from "../Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as modalActions from "../../store/reducers/modals";
import PostModal from "../posts/PostModal";
import PostIndex from "../posts/postsIndex";
import person from "../../assets/image/ghostPerson.svg";
const Feed = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type === "SHOW_MODAL");

  if (!sessionUser) return <Navigate to="/" />;

  const openPostModal = () => {
    dispatch(modalActions.showModal("SHOW_MODAL"));
  };

  return (
    <div className="homePageWrapper">
      <div className="navigationWrapper">
        <Navigation />
      </div>

      <div className="feed-container">
        <div className="feedSideBox">
          <div className="feedIdentity">
            <div className="background-image"></div>
            <a>
              <div className="cameraImg"> </div>
              <div className="name">Welcome, {sessionUser.fname}!</div>
              <div className="photoLink">
                <span>Add a photo </span>
              </div>
            </a>
          </div>
        </div>
        <div className="body">
          <div className="postWrapper">
            <img src={person} width={50} height={50} className="img" />
            <button onClick={openPostModal}> Start a Post </button>
            {modalType && (
              <PostModal
                user={sessionUser.user}
                userName={sessionUser.username}
              />
            )}
          </div>
          <br />

          <div className="allPosts">
            <PostIndex />
          </div>
        </div>
        <div className="feedbox">
          <h2>Linkedln News</h2>
        </div>
      </div>
    </div>
  );
};

export default Feed;
