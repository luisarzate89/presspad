import React from "react";
import ReviewWrapper from "../Wrappers/ReviewWrapper";
import ReviewForm from "./ReviewForm";
import ProfileForm from "./ProfileForm";

const ReviewSection = () => {
  return (
      <ReviewWrapper>
        <ReviewForm />
        <ProfileForm />
      </ReviewWrapper>
  );
};

export default ReviewSection;
