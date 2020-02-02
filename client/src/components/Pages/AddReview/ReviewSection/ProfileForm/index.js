import React from 'react';
import ProfileWrapper from '../../Wrappers/ProfileWrapper';
import ImageSide from './ImageSide';
import ProfileInfo from './ProfileInfo';

const ProfileForm = ({ reviewedInfo, profileImage, bookingId }) => (
  <ProfileWrapper>
    {/* renders the left side of the profile section */}
    <ImageSide bookingId={bookingId} profileImage={profileImage} />

    {/* renders the right side of the profile section */}
    <ProfileInfo reviewedInfo={reviewedInfo} />
  </ProfileWrapper>
);

export default ProfileForm;
