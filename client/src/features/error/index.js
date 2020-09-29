import React from "react";

export const Error = ({ error }) => (
  <div>
    Error {error.code || error} {error.data}
  </div>
);
