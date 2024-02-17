import "./feed.css";
import Navigation from "../Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import * as modalActions from "../../store/reducers/modals";
import PostModal from "../posts/PostModal";
import PostIndex from "../posts/postsIndex";
import person from "../../assets/image/ghostPerson.svg";
import camera from "../../assets/image/camera.svg";
const Feed = () => {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type === "SHOW_MODAL");

  if (!sessionUser) return <Navigate to="/" />;

  const openPostModal = () => {
    dispatch(modalActions.showModal("SHOW_MODAL"));
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/profile/${sessionUser.id}`);
  };

  return (
    <div className="homePageWrapper">
      <div className="navigationWrapper">
        <Navigation />
      </div>

      <div className="feed-container">
        <div>
          <div className="feedSideBox">
            <div className="feedIdentity">
              <div className="background-image"></div>
              <a onClick={handleClick}>
                <img
                  src={sessionUser.photoUrl || camera}
                  className="cameraImg"
                />
                <div className="name">
                  {sessionUser.fname} {sessionUser.lname}
                </div>
              </a>
              {/* <div className="photoLink">
                <span>Add a photo </span>
              </div> */}
            </div>
          </div>
          <div className="feedSecSideBox"></div>
        </div>
        <div className="body">
          <div className="postWrapper">
            <img
              src={sessionUser.photoUrl || person}
              width={50}
              height={50}
              className="img"
            />
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
            <PostIndex type={"feed"} />
          </div>
        </div>
        <div className="feedbox">
          <h2>Careerhub News</h2>
          <ul>
            <li>
              <a href="https://www.linkedin.com/news/story/doj-investigating-gms-cruise-5916444/">
                DOJ investigating GM&apos;s Cruise
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/news/story/pokemon-swipes-at-viral-competitor-5906676/">
                Pokemon swipes at viral competitor
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/news/story/pokemon-swipes-at-viral-competitor-5906676/">
                Bud Light bets on Super Bowl ad
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/news/story/accessible-travel-is-booming-5903876/">
                Accessible travel is booming
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feed;
