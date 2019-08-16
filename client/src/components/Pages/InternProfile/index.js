import React, { Component } from "react";
import axios from "axios";

import Content from "./Content";

class InternProfile extends Component {
  state = {
    viewNumber: 3,
    userInfo: {
      name: "",
      profile: {
        favouriteArticle: {},
        verification: {
          reference1: {
            name: "",
            contact: ""
          },
          reference2: {
            name: "",
            contact: ""
          }
        }
      },
      organisation: {}
    },
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
        handleViewMoreToggle={this.handleViewMoreToggle}
      />
    );
  }
}

export default InternProfile;
