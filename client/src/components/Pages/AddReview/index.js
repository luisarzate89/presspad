import React, { Component } from "react";
import axios from "axios";

import Avatar from "./Avatar";
import CallForReview from "./CallForReview";
import ComponentWrapper from "./Wrappers/ComponentWrapper";
import ReviewSection from "./ReviewSection";

// use the state here and pass props to other components

class AddReview extends Component {

  state = {
    rating: null,
    message: "",
    to: "", // id
    from: "", // id
    booking: "", // id
  };

  async componentDidMount() {
    // get the current booking id
    const { match: { params: { id } } } = this.props;

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
      })
    } else {
      this.setState({
        booking: id,
        from: populatedBooking.intern._id,
        to: populatedBooking.host._id,
        reviewerName: populatedBooking.intern.name,
        reviewedName: populatedBooking.host.name,
        bio,
        jobTitle,
      })
    }
  }

  onRatingChange = (rating) => {
    this.setState({ rating: rating })
  }

  onTextAreaChange = ({ target: {value} }) => {
    this.setState({ message: value })
  }

  /**
   * this needs refactoring to have actual logic after the request is fired.
   */
  onButtonClick = async () => {
    const { to, from, rating, message, booking } = this.state
    try {
      const sentReview = await axios.post(`/api/booking/${this.state.booking}/review`, {
        to, from, rating, message, booking
      })
      console.log(sentReview.data)
    } catch(error) {
      console.log(error.response)
    }
  }

  render() {
    const { reviewerName, reviewedName, bio, jobTitle } = this.state;
    return (
      <ComponentWrapper>
        <Avatar reviewer={reviewerName} reviewed={reviewedName}/>
        <CallForReview reviewed={reviewedName} />
        <ReviewSection
          reviewedInfo={{ reviewedName, bio, jobTitle }}
          onRatingChange={this.onRateChange}
          onTextAreaChange={this.onTextAreaChange}
          onButtonClick={this.onButtonClick}
        />
      </ComponentWrapper>
    );
  }
};

export default AddReview;
