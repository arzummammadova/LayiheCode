import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetschema } from "../../../schema/ResetSchema";
import { toast, ToastContainer } from "react-toastify";

const Resetpassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const submitForm = async (values) => {
    try {
      const { password } = values;
      const result = await axios.post(
        `http://localhost:5000/auth/reset-password/${token}`,
        { password }
      );

     
    if (result.status === 200) {
      setTimeout(() => {
        toast.success("Şifrə uğurla yeniləndi!", { autoClose: 2000 });
      }, 1000); 
      setTimeout(() => {
        navigate("/login");
      }, 3000); 
    }
    } catch (error) {
      toast.error("Xəta baş verdi, yenidən cəhd edin!");
      console.log("Xəta baş verdi:", error);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: submitForm,
    validationSchema: resetschema,
  });

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="register-card">
    
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
          <h2 className="title">
         Reset Your Password Now <span className="logo">Read<span className="highlight">ly</span></span>
        </h2>
       

        <div className="form-group">
         
          <div className="text-danger">{errors.password}</div>
          <label>Enter new Password</label>
          <input
            type="password"
             className="input-field"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="text-danger">{errors.confirmpassword}</div>
          <input
            type="password"
            name="confirmpassword"
            className="input-field"
            onChange={handleChange}
            value={values.confirmpassword}
          />
        </div>

        <button type="submit" style={{width:"100%"}} className="signup-button mt-5">
          Reset
        </button>
      </form>
      </div>
    </div>
  );
};

export default Resetpassword;
