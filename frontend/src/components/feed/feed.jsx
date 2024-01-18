import "./feed.css";
import Navigation from "../Navigation/Navigation";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostModal from "../posts/PostModal";
import { showModal } from "../../store/reducers/modals";
import { Navigate } from "react-router-dom";
import * as modalActions from "../../store/reducers/modals";

const Feed = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const isModalVisible = useSelector(
    (state) => state.modals.type === "SHOW_MODAL"
  );
  // const modalType = useSelector(state => state.modals.type);

  if (!sessionUser) return <Navigate to="/" />;

  const openPostModal = () => {
    dispatch(showModal("SHOW_MODAL"));
  };
  return (
    <div className="homePageWrapper">
      <div className="navigationWrapper">
        <Navigation />
      </div>
      <div className="feed-container">
        <div className="body">
          <div className="postWrapper">
            <button onClick={openPostModal}> Start a Post </button>
            {isModalVisible && showModal !== null && (
              <PostModal onClose={() => dispatch(modalActions.hideModal)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
