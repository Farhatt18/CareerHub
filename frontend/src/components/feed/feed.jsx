import "./feed.css";
import Navigation from "../Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as modalActions from "../../store/reducers/modals";
import PostModal from "../posts/PostModal";

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
        <div className="body">
          <div className="postWrapper">
            <i className="fa-solid fa-user-circle fa-3x" />
            <button onClick={openPostModal}> Start a Post </button>
            {modalType && <PostModal user={sessionUser.user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
