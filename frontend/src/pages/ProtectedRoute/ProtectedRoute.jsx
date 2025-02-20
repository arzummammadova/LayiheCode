import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import why from "../../assets/images/why.jpeg";
import "./protect.scss";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading); 

  const isAdmin = !!user && user?.isAdmin === true;  


  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    }
  }, [isAdmin, isLoading, user, navigate]);
  


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="protect-container">
        <h1>Bu səhifəyə girişiniz qadağandır</h1>
        <p>5 saniyə sonra ana səhifəyə yönləndiriləcəksiniz...</p>
        <img src={why} alt="Qadağan olunmuş giriş" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
