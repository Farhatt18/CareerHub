import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/session/LoginForm";
import SignupForm from "./components/session/SignupForm";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet>{!sessionUser && <LoginForm />}</Outlet>}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        // element: <h1> Welcome!</h1>,
        // element: <h1> Welcome to the start of your professional journey!</h1>,
        element: <LoginForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
        children: [
          {
            path: "show",
            element: <SignupForm />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
