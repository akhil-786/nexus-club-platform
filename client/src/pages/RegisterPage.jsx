import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService";


const RegisterPage = () => {

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      rollNumber: "",
      department: "",
      year: "",
      collegeId: "",
      clubId: "",
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      const response =
        await registerUser(
          formData
        );

      console.log(response);

      alert(
        "Registration successful!"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
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
        className="auth-card max-w-3xl"
      >

        <h1 className="auth-title">
          Join Nexus Club
        </h1>

        <p className="auth-subtitle">
          Create your account and become
          part of your campus community.
        </p>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="register-grid">

            {/* FULL NAME */}
            <div className="input-group">

              <label className="input-label">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="auth-input"
              />

            </div>


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
                placeholder="Enter email"
                className="auth-input"
              />

            </div>


            {/* ROLL NUMBER */}
            <div className="input-group">

              <label className="input-label">
                Roll Number
              </label>

              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                className="auth-input"
              />

            </div>


            {/* DEPARTMENT */}
            <div className="input-group">

              <label className="input-label">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
                className="auth-input"
              />

            </div>


            {/* YEAR */}
            <div className="input-group">

              <label className="input-label">
                Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="auth-select"
              >

                <option value="">
                  Select Year
                </option>

                <option value="1">
                  1st Year
                </option>

                <option value="2">
                  2nd Year
                </option>

                <option value="3">
                  3rd Year
                </option>

                <option value="4">
                  4th Year
                </option>

              </select>

            </div>


            {/* COLLEGE */}
            <div className="input-group">

              <label className="input-label">
                College
              </label>

              <select
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                className="auth-select"
              >

                <option value="">
                  Select College
                </option>

                <option value="cmrec">
                  CMREC
                </option>

                <option value="mrcet">
                  MRCET
                </option>

                <option value="vnrvjiet">
                  VNR VJIET
                </option>

              </select>

            </div>


            {/* CLUB */}
            <div className="input-group">

              <label className="input-label">
                Club
              </label>

              <select
                name="clubId"
                value={formData.clubId}
                onChange={handleChange}
                className="auth-select"
              >

                <option value="">
                  Select Club
                </option>

                <option value="6a06a33735ae32fcd42ebf77">
                  Photography Club
                </option>

              </select>

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
                placeholder="Create password"
                className="auth-input"
              />

            </div>

          </div>


          <button
            type="submit"
            className="auth-submit-btn"
          >
            Create Account
          </button>

        </form>


        <p className="auth-footer-text">
          Already have an account?{" "}

          <Link
            to="/login"
            className="auth-link"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </div>
  );
};

export default RegisterPage;