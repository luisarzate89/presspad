import React, { Component } from "react";
import { message } from "antd";
import * as Yup from "yup";
import axios from "axios";

import {
  disabledEndDate,
  disabledStartDate,
  checkSelectedRange,
  getValidDAtes
} from "./helpers";

import Content from "./Content";

const schema = Yup.object().shape({
  profileImage: Yup.mixed().required("Required"),
  offerImages1: Yup.mixed().required("Required"),
  offerImages2: Yup.mixed().required("Required"),
  offerImages3: Yup.mixed().required("Required"),

  bio: Yup.string().required("Required"),
  organisationName: Yup.string().required("Required"),
  organisationWebsite: Yup.string()
    .url("Not a valid link")
    .required("Required"),
  jobTitle: Yup.string().required("Required"),
  pressPass: Yup.mixed().required("Required"),
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string().required("Required"),
  addressCity: Yup.string().required("Required"),
  addressPostCode: Yup.string().required("Required"),
  offerDescription: Yup.string().required("Required"),
  availableDates: Yup.mixed().test(
    "avialable-dates",
    "Must select avialable dates",
    function(availableDates) {
      const { startDate, endDate } = availableDates[0];
      if (!startDate || !endDate) {
        return false;
      }
      return true;
    }
  )
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
    pressPass: {
      dataUrl: null,
      file: null
    },
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

  validate = () => {
    const {
      profileImage,
      pressPass,
      offerImages1,
      offerImages2,
      offerImages3
    } = this.state;

    const state = {
      ...this.state,
      profileImage: profileImage.file,
      pressPass: pressPass.dataUrl,
      offerImages1: offerImages1.dataUrl,
      offerImages2: offerImages2.dataUrl,
      offerImages3: offerImages3.dataUrl
    };

    return schema.validate(state, { abortEarly: false }).catch(err => {
      const errors = {};
      err.inner.forEach(element => {
        errors[element.path] = element.message;
      });

      this.setState({ errors });
    });
  };
  handleSubmit = e => {
    const form = new FormData();
    e.preventDefault();
    this.validate().then(res => {
      if (res) {
        form.append("bio", this.state.bio);
        form.append("interests", this.state.bio);
        form.append("organisationName", this.state.bio);
        form.append("organisationWebsite", this.state.bio);
        form.append("jobTitle", this.state.bio);
        form.append("addressLine1", this.state.bio);
        form.append("addressLine2", this.state.bio);
        form.append("addressCity", this.state.bio);
        form.append("addressPostCode", this.state.bio);
        form.append("offerDescription", this.state.bio);
        form.append("offerOtherInfo", this.state.bio);
        form.append("availableDates", getValidDAtes(this.state.availableDates));
        form.append("offerImages1", this.state.offerImages1.file);
        form.append("offerImages2", this.state.offerImages2.file);
        form.append("offerImages3", this.state.offerImages3.file);
        form.append("pressPass", this.state.pressPass.file);
        form.append("profileImage", this.state.profileImage.file);

        axios({
          method: "patch",
          url: "/api/hosts/complete-profile",
          data: form,
          headers: {
            "content-type": `multipart/form-data; boundary=${form._boundary}`
          }
        })
          .then(({ data }) => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
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
