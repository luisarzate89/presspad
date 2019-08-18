import React from "react"
import ProfileWrapper from "../../Wrappers/ProfileWrapper";
import ImageSide from "./ImageSide";
import ProfileInfo from "./ProfileInfo";

const ProfileForm = ({ reviewedInfo }) => {
  return (
    <ProfileWrapper>
      {/* renders the left side of the profile section */}
      <ImageSide />

      {/* renders the right side of the profile section */}
      <ProfileInfo reviewedInfo={reviewedInfo} />
    </ProfileWrapper>
  );
}

export default ProfileForm;
