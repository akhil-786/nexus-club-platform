import { useState } from "react";
import { toast } from "react-toastify";

import {
  forgotPassword,
} from "../services/authService";


const ForgotPasswordPage = () => {

  const [email, setEmail] =
    useState("");


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await forgotPassword({
            email,
          });


        toast.success(
          response.message
        );

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Failed to send reset link"
        );
      }
    };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">

          Forgot Password

        </h1>


        <p className="auth-subtitle">

          Enter your email to
          receive a password
          reset link.

        </p>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label className="input-label">

              Email

            </label>


            <input
              type="email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              placeholder="Enter your email"

              className="auth-input"
            />

          </div>


          <button
            type="submit"
            className="auth-submit-btn"
          >

            Send Reset Link

          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPasswordPage;