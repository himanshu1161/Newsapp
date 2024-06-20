import React from "react";
import ajax from "./ajax.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img src={ajax} alt="loading" />
    </div>
  );
};

export default Spinner;
