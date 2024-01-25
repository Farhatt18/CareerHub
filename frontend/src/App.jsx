import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignupForm from "./components/session/SignupForm";
import Feed from "./components/feed/feed";
import Splash from "./components/splash/splash";
import * as sessionActions from "./store/reducers/session";
import ProfilePage from "./components/profile/ProfilePage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return <>{isLoaded && <Outlet />}</>;
}

const router = createBrowserRouter([
  {
    // path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
