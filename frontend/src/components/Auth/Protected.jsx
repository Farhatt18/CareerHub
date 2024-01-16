import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser) {
    // return redirect("/login");
    return <Navigate to="/login" />;
    // return "hello";
  }
  return children;
};
export default Auth;
