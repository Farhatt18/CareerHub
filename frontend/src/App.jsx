import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignupForm from "./components/session/SignupForm";
import Feed from "./components/feed/feed";
import Splash from "./components/splash/splash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
