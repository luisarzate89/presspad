import React, { Component } from 'react';

import axios from 'axios';
import { Skeleton } from 'antd';
import Review from './Review';
import { API_REVIEWS } from '../../../constants/apiRoutes';
import { Wrapper, MainTitle, SubTitle } from './Reviews.style';

export default class Reviews extends Component {
  state = {
    reviews: [],
    loading: false,
  };

  async componentDidMount() {
    const { userId } = this.props;

    this.setState({ loading: true }, async () => {
      const {
        data: { reviews },
      } = await axios.get(API_REVIEWS, {
        params: { to: userId },
      });
      this.setState({ loading: false, reviews });
    });
  }

  render() {
    const { reviews, loading } = this.state;

    return (
      <Wrapper>
        <MainTitle>Reviews</MainTitle>
        <Skeleton loading={loading} active avatar>
          {reviews && reviews.length ? (
            reviews.map(({ rate, name: reviewerName, jobTitle, message }) => (
              <Review
                rate={rate}
                name={reviewerName}
                jobTitle={jobTitle}
                message={message}
              />
            ))
          ) : (
            <SubTitle>Currently no reviews</SubTitle>
          )}
        </Skeleton>
        {loading && <Skeleton loading={loading} active avatar />}
      </Wrapper>
    );
  }
}
