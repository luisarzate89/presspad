import React, { Component } from "react";

import Content from "./Content";

export default class InternCreateProfile extends Component {
  state = {
    data: {
      birthDate: null,
      hometown: null,
      gender: null,
      school: null,
      profileImage: null,
      interests: null,
      bio: null,
      organisation: null,
      useReasonAnswer: null,
      issueAnswer: null,
      mentorDescribeAnswer: null,
      photoID: null,
      hearAboutPressPadAnswer: null,
      phoneNumber: null,
      reference1: {
        name: null,
        contact: null
      },
      reference2: {
        name: null,
        contact: null
      },
      offerLetter: null,
      internshipOfficeAddress: null,
      emergencyContact: {
        name: null,
        number: null,
        email: null
      },
      DBSCheck: null,
      sexualOrientation: null,
      degreeLevel: null,
      ethnicity: null,
      earningOfParents: null,
      disability: null,
      parentsWorkInPress: null,
      caringResponsibilities: null,
      allergies: null,
      backgroundAnswer: null,
      consentedOnPressPadTerms: null
    },
    errors: {
      birthDate: null,
      hometown: null,
      gender: null,
      school: null,
      profileImage: null,
      interests: null,
      bio: null,
      organisation: null,
      useReasonAnswer: null,
      issueAnswer: null,
      mentorDescribeAnswer: null,
      photoID: null,
      hearAboutPressPadAnswer: null,
      phoneNumber: null,
      reference1: {
        name: null,
        contact: null
      },
      reference2: {
        name: null,
        contact: null
      },
      offerLetter: null,
      internshipOfficeAddress: null,
      emergencyContact: {
        name: null,
        number: null,
        email: null
      },
      DBSCheck: null,
      sexualOrientation: null,
      degreeLevel: null,
      ethnicity: null,
      earningOfParents: null,
      disability: null,
      parentsWorkInPress: null,
      caringResponsibilities: null,
      allergies: null,
      backgroundAnswer: null,
      consentedOnPressPadTerms: null
    }
  };

  handleChange = ({ value, key, parent }) => {
    console.log(key);
    if (parent) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [parent]: { ...prevState.data[parent], [key]: value }
        }
      }));
    } else {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [key]: value
        }
      }));
    }
  };

  handleError = e => {
    console.log(e);
  };

  render() {
    const { name, id } = this.props;
    const { errors, data } = this.state;
    return (
      <Content
        name={name}
        errors={errors}
        data={data}
        handleChange={this.handleChange}
        handleError={this.handleError}
        userId={id}
      />
    );
  }
}
