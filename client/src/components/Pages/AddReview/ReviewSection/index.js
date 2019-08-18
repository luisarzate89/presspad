import React from "react";
import ReviewWrapper from "../Wrappers/ReviewWrapper";
import ReviewForm from "./ReviewForm";
import ProfileForm from "./ProfileForm";

const ReviewSection = ({
  onTextAreaChange, onRatingChange, onButtonClick, reviewedInfo
  }) => {
  return (
      <ReviewWrapper>
        <ReviewForm
          onRatingChange={onRatingChange}
          onTextAreaChange={onTextAreaChange}
          onButtonClick={onButtonClick}
        />
        <ProfileForm reviewedInfo={reviewedInfo} />
      </ReviewWrapper>
  );
};

export default ReviewSection;
