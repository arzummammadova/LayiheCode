import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    alert("Sizin bu səhifəyə girişiniz qadağandır!");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
