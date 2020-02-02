import React from 'react';
import ImageWrapper from '../../Wrappers/ImageWrapper';
import { ProfileLink, ProfileImage } from './ProfileForm.style';

const ImageSide = ({ profileImage, bookingId }) => (
  <ImageWrapper>
    <ProfileImage src={profileImage} />
    <ProfileLink to={`/booking/${bookingId}`}>View Booking</ProfileLink>
  </ImageWrapper>
);

export default ImageSide;
