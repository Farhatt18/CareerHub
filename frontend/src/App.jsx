//app
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import LoginForm from "./components/session/LoginForm";
import * as sessionActions from "./store/reducers/session";
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import LoginForm from "./components/session/LoginForm";
import SignupForm from "./components/session/SignupForm";
// import Protected from "./components/Auth/Protected";
import Feed from "./components/feed/feed";
import Splash from "./components/splash/splash";

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
      // {
      //   path: "posts",
      //   element: (
      //     <Protected>
      //       <PostIndex />
      //     </Protected>
      //   ),
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
