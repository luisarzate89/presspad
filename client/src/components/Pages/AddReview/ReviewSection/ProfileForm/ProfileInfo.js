import React from "react";
import ProfileInfoWrapper from "../../Wrappers/ProfileInfoWrapper";
import { RevieweeName, RevieweeTitle, RevieweeBio } from "./ProfileForm.style";

const ProfileInfo = ({ reviewedInfo }) => {
  const { reviewedName, bio, jobTitle } = reviewedInfo;
  return (
    <ProfileInfoWrapper>
      <RevieweeName>{reviewedName}</RevieweeName>
      <RevieweeTitle>
        {jobTitle}
      </RevieweeTitle>
      <RevieweeBio>
        {bio}
      </RevieweeBio>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
