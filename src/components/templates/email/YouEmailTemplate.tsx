import * as React from "react";

export const YouEmailTemplate = ({
  name,
  email,
  message,
}: {
  name: string | any;
  email: string | any;
  message: string | any;
}) => (
  <div>
    <p>
      Hi <strong style={{ textTransform: "capitalize" }}>{name}</strong>,
    </p>
    <p>Thank you for contacting us. We will get back to you shortly.</p>
  </div>
);
