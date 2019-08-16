import React, { Component } from "react";
import axios from "axios";

import Content from "./Content";

class InternProfile extends Component {
  state = {
    viewNumber: 3,
    userInfo: {},
    bookingsWithReviews: []
  };
  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    axios
      .get(`/api/interns/${id}/profile/?expand=bookings&expand=reviews`)
      .then(res => {
        this.setState({
          isLoading: false,
          userInfo: res.data.userInfo,
          bookingsWithReviews: res.data.bookingsWithReviews
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          return this.props.history.push("/404");
        }
        if (err.response && err.response.status === 500) {
          return this.props.history.push("/500");
        }
      });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  handleViewMoreToggle = () => {
    const { viewNumber } = this.state;
    this.setState({ viewNumber: viewNumber ? undefined : 3 });
  };

  render() {
    const { role } = this.props;
    const { userInfo, bookingsWithReviews, viewNumber } = this.state;
    const { name, profile = {}, organisation = {} } = userInfo;

    const {
      bio,
      jobTitle,
      favouriteArticle = {},
      verification = {},
      profileImage = {}
    } = profile;

    const { title, author, description, link } = favouriteArticle;

    const { name: orgName } = organisation;

    const {
      reference1 = {},
      reference2 = {},
      photoID = {},
      offerLetter = {}
    } = verification;

    let linkWithHttp = link || "";

    if (!linkWithHttp.match(/^http?:\/\//i)) {
      linkWithHttp = "http://" + link;
    }

    const { windowWidth } = this.props;

    return (
      <Content
        name={name}
        bio={bio}
        jobTitle={jobTitle}
        title={title}
        author={author}
        description={description}
        linkWithHttp={linkWithHttp}
        orgName={orgName}
        reference1={reference1}
        reference2={reference2}
        bookingsWithReviews={bookingsWithReviews}
        photoID={photoID}
        offerLetter={offerLetter}
        profileImage={profileImage}
        windowWidth={windowWidth}
        viewNumber={viewNumber}
        goBack={this.goBack}
        profile={profile}
        handleViewMoreToggle={this.handleViewMoreToggle}
        role={role}
      />
    );
  }
}

export default InternProfile;
