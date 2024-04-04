/* eslint-disable react/no-unescaped-entities */
import React from "react";

const ForgotPasswordEmailTemplate = ({
  name,
  resetToken,
  email,
}: {
  name: string;
  resetToken: number;
  email: string;
}) => {
  const emailStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "tomato",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "5px",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    margin: "0",
    textAlign: "center",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "white",
    margin: "10px 0",
  };

  const codeContainer: React.CSSProperties = {
    backgroundColor: "white",
    color: "tomato",
    borderRadius: "5px",
    padding: "10px",
    textAlign: "center",
  };

  const codeStyle: React.CSSProperties = {
    fontSize: "20px",
    margin: "0",
  };

  const linkStyle: React.CSSProperties = {
    color: "tomato",
    textDecoration: "underline",
    cursor: "pointer",
  };

  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/resetPassword?email=${email}&token=${resetToken}`;

  return (
    <div style={emailStyle}>
      <h1 style={headerStyle}>Homely Bites - Forgot Password</h1>
      <p style={textStyle}>Hello, {name}!</p>
      <p style={textStyle}>You've requested to reset your password.</p>
      <p style={textStyle}>
        To reset your password, please click on the following link:
      </p>
      <div style={codeContainer}>
        <a href={resetLink} style={linkStyle}>
          Reset Password
        </a>
      </div>
      <p style={textStyle}>
        This link will expire in 10 minutes for security reasons.
      </p>
      <p style={textStyle}>
        If you did not request this password reset, please ignore this email or
        contact our support team immediately.
      </p>
    </div>
  );
};

export default ForgotPasswordEmailTemplate;
