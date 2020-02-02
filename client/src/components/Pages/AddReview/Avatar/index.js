import React from 'react';
import { Avatar } from 'antd';
import AvatarStyle from './AvatarStyle';
import AvatarWrapper from '../Wrappers/AvatarWrapper';
import Message from './Message';

const AvatarComponent = ({ reviewer, reviewed, profileImage }) => {
  const reviewerFirstName = reviewer ? reviewer.split(' ')[0] : null;
  const reviewedFirstName = reviewed ? reviewed.split(' ')[0] : null;
  return (
    <AvatarWrapper>
      <Avatar src={profileImage} style={AvatarStyle} />
      {reviewerFirstName && reviewedFirstName && (
        <Message>
          Hi, {reviewerFirstName}! What do you think of {reviewedFirstName}?
        </Message>
      )}
    </AvatarWrapper>
  );
};

export default AvatarComponent;
