//app
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import LoginForm from "./components/session/LoginForm";
import SignupForm from "./components/session/SignupForm";
// import Protected from "./components/Auth/Protected";
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
        element: (
          // <Protected>
          <Feed />
          // </Protected>
        ),
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
