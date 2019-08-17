import React from "react";
import { Avatar } from "antd";
import AvatarStyle from "./AvatarStyle";
import AvatarWrapper from "../Wrappers/AvatarWrapper";
import Message from "./Message";

const AvatarComponent = () => {
  return (
    <AvatarWrapper>
      <Avatar style={AvatarStyle} />
      <Message>Hi, Andrew! What do you think of Emily?</Message>
    </AvatarWrapper>
  );
};

export default AvatarComponent;
