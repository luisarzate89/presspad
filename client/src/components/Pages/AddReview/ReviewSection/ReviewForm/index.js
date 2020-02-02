import React from 'react';
import { Rate, Checkbox, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import ReviewFormWrapper from '../../Wrappers/ReviewFormWrapper';
import ReviewFormHeaders from './ReviewFormHeaders';
import TextArea from './TextArea';
import { RateStyle, CheckboxStyle, ButtonStyle } from './Styles';

const ReviewForm = ({ onRatingChange, onTextAreaChange, onButtonClick }) => (
  <ReviewFormWrapper>
    <ReviewFormHeaders>Rating</ReviewFormHeaders>
    <Rate onChange={onRatingChange} style={RateStyle} />
    <ReviewFormHeaders>Review</ReviewFormHeaders>
    <TextArea onChange={onTextAreaChange} />
    <ReviewFormHeaders>Report a problem</ReviewFormHeaders>
    <p>
      If you believe there has been inapropriate behavior during your
      intern&apos;s stay please tick the box below.
    </p>
    <Checkbox style={CheckboxStyle}>Report inapropriate behavior</Checkbox>
    <Button onClick={onButtonClick} style={ButtonStyle} type="primary">
      Send Review
    </Button>
  </ReviewFormWrapper>
);

export default withRouter(ReviewForm);
