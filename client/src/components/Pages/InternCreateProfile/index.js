import React, { Component } from "react";

import Content from "./Content";
import axios from "axios";
import {
  API_INTERN_COMPLETE_PROFILE,
  DASHBOARD_URL
} from "./../../../constants/apiRoutes";

import { Modal, Alert } from "antd";
export default class InternCreateProfile extends Component {
  state = {
    activeKey: "Profile",
    data: {
      birthDate: undefined,
      hometown: undefined,
      gender: undefined,
      school: undefined,
      profileImage: {
        fileName: undefined,
        isPrivate: false
      },
      interests: undefined,
      bio: undefined,
      organisation: undefined,
      useReasonAnswer: undefined,
      issueAnswer: undefined,
      mentorDescribeAnswer: undefined,
      photoID: {
        fileName: undefined,
        isPrivate: false
      },
      hearAboutPressPadAnswer: undefined,
      phoneNumber: undefined,
      reference1: {
        name: undefined,
        email: undefined
      },
      reference2: {
        name: undefined,
        email: undefined
      },
      offerLetter: {
        fileName: undefined,
        isPrivate: false
      },
      internshipOfficeAddress: undefined,
      emergencyContact: {
        name: undefined,
        phoneNumber: undefined,
        email: undefined
      },
      DBSCheck: {
        fileName: undefined,
        isPrivate: false
      },
      sexualOrientation: undefined,
      degreeLevel: undefined,
      ethnicity: undefined,
      earningOfParents: undefined,
      disability: undefined,
      parentsWorkInPress: undefined,
      caringResponsibilities: undefined,
      allergies: undefined,
      backgroundAnswer: undefined,
      consentedOnPressPadTerms: undefined
    },
    errors: {
      birthDate: undefined,
      hometown: undefined,
      gender: undefined,
      school: undefined,
      profileImage: {
        fileName: undefined,
        isPrivate: false
      },
      interests: undefined,
      bio: undefined,
      organisation: undefined,
      useReasonAnswer: undefined,
      issueAnswer: undefined,
      mentorDescribeAnswer: undefined,
      photoID: {
        fileName: undefined,
        isPrivate: false
      },
      hearAboutPressPadAnswer: undefined,
      phoneNumber: undefined,
      reference1: {
        name: undefined,
        email: undefined
      },
      reference2: {
        name: undefined,
        email: undefined
      },
      offerLetter: {
        fileName: undefined,
        isPrivate: false
      },
      internshipOfficeAddress: undefined,
      emergencyContact: {
        name: undefined,
        phoneNumber: undefined,
        email: undefined
      },
      DBSCheck: {
        fileName: undefined,
        isPrivate: false
      },
      sexualOrientation: undefined,
      degreeLevel: undefined,
      ethnicity: undefined,
      earningOfParents: undefined,
      disability: undefined,
      parentsWorkInPress: undefined,
      caringResponsibilities: undefined,
      allergies: undefined,
      backgroundAnswer: undefined,
      consentedOnPressPadTerms: undefined
    }
  };

  handleChange = ({ value, key, parent }) => {
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

  handleError = ({ value, key, parent }) => {
    if (parent) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [parent]: { ...prevState.errors[parent], [key]: value }
        }
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [key]: value
        }
      }));
    }
  };

  onChangeTabs = activeKey => {
    // TODO: run validation
    this.setState({ activeKey });
  };

  handleSubmit = () => {
    //TODO: run validation
    axios
      .post(API_INTERN_COMPLETE_PROFILE, { ...this.state.data })
      .then(({ data }) => {
        Modal.destroyAll();
        Modal.success({
          title: "Done",
          content: (
            <Alert
              message="Thank you"
              description="Your info has been updated"
              type="success"
            />
          ),

          onOk: () => {
            this.props.history.push(DASHBOARD_URL);
          },
          type: "success"
        });
        this.setState({ loading: false, success: true });
      })
      .catch(err => {
        Modal.destroyAll();
        Modal.error({
          title: "Error",
          content: (
            <Alert
              message="Error"
              description={err.response.data.error}
              type="error"
            />
          ),
          type: "error"
        });
        this.setState({ loading: false, erros: err.response.data });
      });
  };

  render() {
    const { name, id } = this.props;
    const { errors, data, activeKey } = this.state;
    return (
      <Content
        name={name}
        errors={errors}
        data={data}
        handleChange={this.handleChange}
        handleError={this.handleError}
        userId={id}
        onChangeTabs={this.onChangeTabs}
        activeKey={activeKey}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
