import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

const LoginPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await loginUser(
          formData
        );

      console.log(response);


      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.token
      );


      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );


      // alert("Login successful!");
      toast.success(
        `Welcome back ${response.user.fullName}`
      );


    setTimeout(() => {

  if (
    response.user.role ===
    "student"
  ) {

    navigate(
      "/student-dashboard"
    );
  }

  else if (
    response.user.role ===
    "club_admin"
  ) {

    navigate(
      "/club-dashboard"
    );
  }

  else if (
    response.user.role ===
    "college_admin"
  ) {

    navigate(
      "/college-dashboard"
    );
  }

}, 500);

    } catch (error) {

      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
      // alert(
      //   error.response?.data?.message ||
      //   "Login failed"
      // );
    }
  };


  return (
    <div className="auth-page">

      {/* Background Glows */}
      <div className="glow-purple"></div>
      <div className="glow-cyan"></div>


      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="auth-card"
      >

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue your campus
          journey with Nexus Club.
        </p>


        <form className="auth-form" onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="input-group">

            <label className="input-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="auth-input"
            />

          </div>


          {/* PASSWORD */}
          <div className="input-group">

            <label className="input-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="auth-input"
            />

          </div>


          <button
            type="submit"
            className="auth-submit-btn"
          >
            Login
          </button>

        </form>


        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}

          <Link
            to="/register"
            className="auth-link"
          >
            Register
          </Link>

        </p>

         <div className="auth-footer-text ">

  <Link to="/forgot-password">

    Forgot Password?

  </Link>

</div>

       

      </motion.div>

    </div>
  );
};

export default LoginPage;