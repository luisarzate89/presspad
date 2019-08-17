import React from "react";
import ProfileInfoWrapper from "../../Wrappers/ProfileInfoWrapper";
import { RevieweeName, RevieweeTitle, RevieweeBio } from "./ProfileForm.style";

const ProfileInfo = () => {
  return (
    <ProfileInfoWrapper>
      <RevieweeName>Emily Banks</RevieweeName>
      <RevieweeTitle>
        Policy Research Editor at the Financial Times
      </RevieweeTitle>
      <RevieweeBio>
        I work at a major news publisher specializing in politics and international relations.
        Used to travel a lot but now deal mainly with local policies.
      </RevieweeBio>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
