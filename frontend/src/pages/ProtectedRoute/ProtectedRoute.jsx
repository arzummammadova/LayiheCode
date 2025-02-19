import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import why from '../../assets/images/why.jpeg';
import './protect.scss'
const ProtectedRoute = ({ isAdmin, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000); 
    }
  }, [isAdmin, navigate]);

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
