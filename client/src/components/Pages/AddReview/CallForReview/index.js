import React from 'react';
import Title from './Title';
import Text from './Text';

const CallForReview = ({ reviewed }) => {
  const reviewedFirstName = reviewed ? reviewed.split(' ')[0] : null;
  return (
    <>
      <Title>Leave a Review</Title>
      <Text>
        Now that your stay with {reviewedFirstName} has finished, we&apos;d like
        you to leave a review on their profile.
      </Text>
    </>
  );
};

export default CallForReview;
