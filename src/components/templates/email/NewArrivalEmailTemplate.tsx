import React from "react";

interface EmailTemplateProps {
  name: string;
  verifyKey: number;
}

const NewArrivalEmailTemplate = ({ name, verifyKey }: EmailTemplateProps) => {
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

  return (
    <div style={emailStyle}>
      <h1 style={headerStyle}>Welcome to Homely Bites!</h1>
      <p style={textStyle}>Hello, {name}!</p>
      <p style={textStyle}>Thank you for choosing Homely Bites.</p>
      <p style={textStyle}>
        To verify your account, please use the following verification code:
      </p>
      <div style={codeContainer}>
        <p style={codeStyle}>{verifyKey}</p>
      </div>
      <p style={textStyle}>
        This code will expire in 10 minutes for security reasons.
      </p>
      <p style={textStyle}>
        If you did not request this verification code, please contact our
        support team immediately.
      </p>
    </div>
  );
};

export default NewArrivalEmailTemplate;
