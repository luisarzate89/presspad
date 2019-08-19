import React from "react";
import ReviewWrapper from "../Wrappers/ReviewWrapper";
import ReviewForm from "./ReviewForm";
import ProfileForm from "./ProfileForm";

const ReviewSection = ({
  onTextAreaChange,
  onRatingChange,
  onButtonClick,
  reviewedInfo,
  profileImage,
  bookingId,
  }) => {
  return (
      <ReviewWrapper>
        <ProfileForm
          bookingId={bookingId}
          profileImage={profileImage}
          reviewedInfo={reviewedInfo}
        />
        <ReviewForm
          onRatingChange={onRatingChange}
          onTextAreaChange={onTextAreaChange}
          onButtonClick={onButtonClick}
        />
      </ReviewWrapper>
  );
};

export default ReviewSection;
