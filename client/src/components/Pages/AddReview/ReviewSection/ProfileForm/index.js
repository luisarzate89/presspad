import React from "react"
import ProfileWrapper from "../../Wrappers/ProfileWrapper";
import ImageSide from "./ImageSide";
import ProfileInfo from "./ProfileInfo";

const ProfileForm = () => {
  return (
    <ProfileWrapper>
      {/* renders the left side of the profile section */}
      <ImageSide />

      {/* renders the right side of the profile section */}
      <ProfileInfo />
    </ProfileWrapper>
  );
}

export default ProfileForm;
