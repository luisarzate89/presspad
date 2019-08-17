import React from "react";
import ImageWrapper from "../../Wrappers/ImageWrapper";
import { ProfileLink, ProfileImage } from "./ProfileForm.style";

const ImageSide = () => {
  return (
    <ImageWrapper>
      <ProfileImage src="#"/>
      <ProfileLink to="#">View Booking</ProfileLink>
    </ImageWrapper>
  )
};

export default ImageSide;
