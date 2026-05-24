import { useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast }
from "react-toastify";

import {
  resetPassword,
} from "../services/authService";


const ResetPasswordPage =
() => {

  const navigate =
    useNavigate();

  const { token } =
    useParams();


  const [
    password,
    setPassword
  ] = useState("");


  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");


  const [
    passwordError,
    setPasswordError
  ] = useState(false);


  const validatePassword =
    (password) => {

      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      return regex.test(password);
  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();


      if (
        !validatePassword(
          password
        )
      ) {

        setPasswordError(true);

        toast.error(

          "Weak password detected"
        );

        return;
      }


      if (
        password !==
        confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;
      }


      try {

        const response =
          await resetPassword(

            token,

            {
              password,
            }
          );


        toast.success(
          response.message
        );


        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Failed to reset password"
        );
      }
    };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">

          Reset Password

        </h1>


        <p className="auth-subtitle">

          Create a new secure
          password for your
          account.

        </p>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* PASSWORD */}

          <div className="input-group">

            <label className="input-label">

              New Password

            </label>


            <input
              type="password"

              value={password}

              onChange={(e) => {

                setPassword(
                  e.target.value
                );

                setPasswordError(
                  false
                );
              }}

              placeholder="Enter new password"

              className={`auth-input ${
                passwordError
                  ? "input-error"
                  : ""
              }`}
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="input-group">

            <label className="input-label">

              Confirm Password

            </label>


            <input
              type="password"

              value={confirmPassword}

              onChange={(e) =>

                setConfirmPassword(
                  e.target.value
                )
              }

              placeholder="Confirm password"

              className="auth-input"
            />

          </div>


          <button
            type="submit"
            className="auth-submit-btn"
          >

            Reset Password

          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPasswordPage;