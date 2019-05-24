import React, { Component } from "react";
import { message } from "antd";
import * as Yup from "yup";

import {
  disabledEndDate,
  disabledStartDate,
  checkSelectedRange
} from "./helpers";

import Content from "./Content";

const schema = Yup.object().shape({
  profileImage: Yup.mixed().required("Required"),
  bio: Yup.string().required("Required"),
  organisationName: Yup.string().required("Required"),
  organisationWebsite: Yup.string()
    .url("Not a valid link")
    .required("Required"),
  jobTitle: Yup.string().required("Required"),
  pressPass: Yup.mixed().required("Required")
});

class HostCreateProfile extends Component {
  state = {
    profileImage: {
      dataUrl: null,
      file: null
    },
    bio: "",
    interests: "",
    organisationName: "",
    organisationWebsite: "",

    jobTitle: "",
    addressLine1: "",
    addressLine2: "",
    addressCity: "",
    addressPostCode: "",
    offerDescription: "",
    offerOtherInfo: [],

    availableDates: [
      {
        startDate: null,
        endDate: null,
        endOpen: false
      }
    ],

    offerImages1: {
      dataUrl: null,
      file: null
    },
    offerImages2: {
      dataUrl: null,
      file: null
    },
    offerImages3: {
      dataUrl: null,
      file: null
    },
    pressPass: {},
    errors: {}
  };

  handleOtherInfo = otherInfo => {
    this.setState({ otherInfo });
  };

  handleAddProfile = ({ target }) => {
    const { files, name } = target;
    const image = files && files[0];
    var reader = new FileReader();

    reader.onload = () => {
      var dataUrl = reader.result;

      this.setState({
        [name]: {
          dataUrl,
          file: image
        }
      });
    };

    image && reader.readAsDataURL(image);
  };

  handelInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  hsndleSubmit = e => {
    const { profileImage, pressPass } = this.state;
    const state = {
      ...this.state,
      profileImage: profileImage.file,
      pressPass: pressPass.dataUrl
    };
    e.preventDefault();
    schema.validate(state, { abortEarly: false }).catch(err => {
      const errors = {};
      err.inner.forEach(element => {
        errors[element.path] = element.message;
      });
      console.log(errors);

      this.setState({ errors });
    });
  };

  disabledStartDate = (index, startDate) => {
    const { availableDates } = this.state;
    return disabledStartDate(index, startDate, availableDates);
  };

  disabledEndDate = (index, endDate) => {
    const { availableDates } = this.state;
    return disabledEndDate(index, endDate, availableDates);
  };

  changeSelectedDate = (index, field, value) => {
    const { availableDates } = this.state;

    const newAvailableDates = [...availableDates];
    const obj = {
      [field]: value
    };
    const { startDate } = newAvailableDates[index];

    let isDatePicked;
    if (field === "startDate") {
      obj.endOpen = true;
    } else if (field === "endDate") {
      obj.endOpen = false;

      isDatePicked = checkSelectedRange(startDate, value, newAvailableDates);
    }

    if (isDatePicked) {
      return message.warning("Cannot select intersected ranges");
    }

    newAvailableDates[index] = { ...newAvailableDates[index], ...obj };

    this.setState({ availableDates: newAvailableDates });
  };

  onStartChange = (index, value) => {
    this.changeSelectedDate(index, "startDate", value);
  };

  onEndChange = (index, value) => {
    this.changeSelectedDate(index, "endDate", value);
  };

  // add new available dates range
  handleAddMoreRanges = () => {
    const { availableDates } = this.state;

    const emptyRanges = availableDates.reduce((prev, curr) => {
      const { endDate, startDate } = curr;
      if (!endDate || !startDate) {
        return true;
      }
      return prev || false;
    }, false);

    if (emptyRanges) {
      return message.warning("fill the previous ranges");
    }

    const newAvailableDates = [...availableDates];
    newAvailableDates.push({
      startDate: null,
      endDate: null,
      endOpen: false
    });
    this.setState({ availableDates: newAvailableDates });
  };

  render() {
    return (
      <Content
        handleOtherInfo={this.handleOtherInfo}
        handleAddProfile={this.handleAddProfile}
        handelInputChange={this.handelInputChange}
        handleSubmit={this.handleSubmit}
        disabledStartDate={this.disabledStartDate}
        disabledEndDate={this.disabledEndDate}
        onEndChange={this.onEndChange}
        onStartChange={this.onStartChange}
        handleAddMoreRanges={this.handleAddMoreRanges}
        state={this.state}
      />
    );
  }
}

export default HostCreateProfile;
