import * as React from "react";

export const MeEmailTemplate = ({
  name,
  email,
  message,
}: {
  name: string | any;
  email: string | any;
  message: string | any;
}) => (
  <div>
    <p>Hi Boss we got a new client message!</p>
    <p>
      <strong>Name:</strong>
      {name}
    </p>

    <p>
      <strong>Email:</strong>
      {email}
    </p>
    <p>
      <strong>Message:</strong>
      {message}
    </p>
  </div>
);
