import "./feed.css";
import Navigation from "../Navigation/Navigation";
// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";/
import { Navigate } from "react-router-dom";

// import * as sessionActions from "../../store/reducers/session";
// import Protected from "../Auth/Protected";
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
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return <Navigate to="/" />;
  return (
    <div className="feed-container">
      <div className="navigationWrapper">
        <Navigation />
      </div>
      <div>
        <h1>Welcome!</h1>
      </div>
    </div>
  );
};

export default Feed;
