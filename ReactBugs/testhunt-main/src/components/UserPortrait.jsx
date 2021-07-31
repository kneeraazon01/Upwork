import React from "react";
import { UserPortraitSVG } from "./SVGCollection";

const UserPortrait = ({ onClick }) => {
  return (
    <div onClick={onClick} className="user-portrait">
      <UserPortraitSVG />
    </div>
  );
};

export default UserPortrait;
