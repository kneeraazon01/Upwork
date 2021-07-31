import React from "react";

const CommonButton = ({
  className = "newd__btn",
  disabled,
  children,
  onClick = () => {},
}) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default CommonButton;
