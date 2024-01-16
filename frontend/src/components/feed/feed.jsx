import "./feed.css";
import Navigation from "../Navigation/Navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import * as sessionActions from "../../store/reducers/session";
import Protected from "../Auth/Protected";
// import PostIndex from "../posts/postsIndex";

// const Feed = () => {
//   return (
//     <div className="feed-container">
//       <div className="feedpage">
//         <Navigation />
//       </div>
//     </div>
//   );
// };

const Feed = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(sessionActions.restoreSession());
        setIsLoaded(true);
      } catch (error) {
        console.error("Error restoring session:", error);
        setIsLoaded(true); // Set isLoaded to true to avoid infinite loop
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    // <div className="main">
    <>
      <Navigation />
      <div className="main">{isLoaded && <Outlet />}</div>
    </>
    // </div>
  );
};

export default Feed;
