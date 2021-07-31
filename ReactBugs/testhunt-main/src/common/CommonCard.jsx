import React from "react";

const CommonCard = ({ children, className = "" }) => {
  return (
    <div className={`common_card___container ${className}`}>{children}</div>
  );
};

export default CommonCard;
