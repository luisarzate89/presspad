import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import randomProfile from '../../../assets/random-profile.jpg';
import Avatar from './Avatar';
import CallForReview from './CallForReview';
import ComponentWrapper from './Wrappers/ComponentWrapper';
import ReviewSection from './ReviewSection';

// use the state here and pass props to other components

class AddReview extends Component {
  state = {
    rating: null,
    message: '',
    to: '', // id
    from: '', // id
    booking: '', // id
  };

  async componentDidMount() {
    // get the current booking id
    const {
      match: {
        params: { id },
      },
    } = this.props; // in my opinion a case against using prettier.

    // should request the current booking information
    // and return booking document populated with both host and intern documents.
    // will also return some information from the profile of the reviewed user.
    const bookingInformation = await axios.get(`/api/review-info/${id}`);
    const { populatedBooking, bio, jobTitle, user } = bookingInformation.data;

    // determine the reviewer and reviewed.
    if (user === populatedBooking.host.id) {
      this.setState({
        booking: id,
        from: populatedBooking.host._id,
        to: populatedBooking.intern._id,
        reviewerName: populatedBooking.host.name,
        reviewedName: populatedBooking.intern.name,
        bio,
        jobTitle,
      });
    } else {
      this.setState({
        booking: id,
        from: populatedBooking.intern._id,
        to: populatedBooking.host._id,
        reviewerName: populatedBooking.intern.name,
        reviewedName: populatedBooking.host.name,
        bio,
        jobTitle,
      });
    }
  }

  onRatingChange = rating => {
    this.setState({ rating });
  };

  onTextAreaChange = ({ target: { value } }) => {
    this.setState({ message: value });
  };

  /**
   * this needs refactoring to have actual logic after the request is fired.
   */
  onButtonClick = async () => {
    const { to, from, rating, message, booking } = this.state;
    try {
      await axios.post(`/api/booking/${this.state.booking}/review`, {
        to,
        from,
        rating,
        message,
        booking,
      });
      // show success message to the user
      Swal.fire({
        type: 'success',
        title: 'Review has been sent successfully!',
      });
    } catch (error) {
      Swal.fire({
        type: 'error',
        title: `${error.response.data.error}`,
      });
    }
  };

  render() {
    const {
      reviewerName,
      reviewedName,
      bio,
      jobTitle,
      profileImage,
      booking,
    } = this.state;

    return (
      <ComponentWrapper>
        <Avatar
          reviewer={reviewerName}
          reviewed={reviewedName}
          profileImage={randomProfile}
        />
        <CallForReview reviewed={reviewedName} />
        <ReviewSection
          reviewedInfo={{ reviewedName, bio, jobTitle }}
          onRatingChange={this.onRatingChange}
          onTextAreaChange={this.onTextAreaChange}
          onButtonClick={this.onButtonClick}
          profileImage={profileImage || randomProfile}
          bookingId={booking}
        />
      </ComponentWrapper>
    );
  }
}

export default AddReview;
