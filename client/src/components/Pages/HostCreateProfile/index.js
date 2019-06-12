import React, { Component } from "react";
import { message, Modal, Spin, Alert } from "antd";
import * as Yup from "yup";
import axios from "axios";

import { API_HOST_COMPLETE_PROFILE } from "../../../constants/apiRoutes";

import { DASHBOARD_URL } from "./../../../constants/navRoutes";

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
  addressLine2: Yup.string(),
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
    attemptedToSubmit: false,
    loading: true,
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

  handleOtherInfo = offerOtherInfo => {
    this.setState({ offerOtherInfo });
  };

  handleAddProfile = ({ target }) => {
    const { files, name } = target;
    const image = files && files[0];

    var reader = new FileReader();

    reader.onload = () => {
      var dataUrl = reader.result;
      this.setState(
        {
          [name]: {
            dataUrl,
            file: image
          }
        },
        () => this.state.attemptedToSubmit && this.updateErrors()
      );
    };

    image && reader.readAsDataURL(image);
  };

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      { [name]: value },
      () => this.state.attemptedToSubmit && this.updateErrors()
    );
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

  updateErrors = async () => {
    await this.validate();
  };

  handleSubmit = e => {
    const form = new FormData();
    e.preventDefault();
    this.setState({ attemptedToSubmit: true });
    this.validate().then(res => {
      if (res) {
        this.setState({ errors: {}, uploading: true });
        Modal.destroyAll();
        Modal.info({
          title: "Uploading",
          content: (
            <Spin spinning={this.state.loading}>
              <Alert
                message="updating your info"
                description="this might take sometime"
                type="info"
              />
            </Spin>
          ),
          okButtonProps: {
            disabled: true
          }
        });

        form.append("bio", this.state.bio);
        form.append("interests", this.state.interests);
        form.append("organisationName", this.state.organisationName);
        form.append("organisationWebsite", this.state.organisationWebsite);
        form.append("jobTitle", this.state.jobTitle);
        form.append("addressLine1", this.state.addressLine1);
        form.append("addressLine2", this.state.addressLine2);
        form.append("addressCity", this.state.addressCity);
        form.append("addressPostCode", this.state.addressPostCode);
        form.append("offerDescription", this.state.offerDescription);
        form.append(
          "offerOtherInfo",
          JSON.stringify(this.state.offerOtherInfo)
        );
        form.append(
          "availableDates",
          JSON.stringify(getValidDAtes(this.state.availableDates))
        );
        form.append("offerImages1", this.state.offerImages1.file);
        form.append("offerImages2", this.state.offerImages2.file);
        form.append("offerImages3", this.state.offerImages3.file);
        form.append("pressPass", this.state.pressPass.file);
        form.append("profileImage", this.state.profileImage.file);

        axios({
          method: "post",
          url: API_HOST_COMPLETE_PROFILE,
          data: form,
          headers: {
            "content-type": `multipart/form-data; boundary=${form._boundary}`
          }
        })
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

    this.setState(
      { availableDates: newAvailableDates },
      () => this.state.attemptedToSubmit && this.updateErrors()
    );
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
    const { name, id } = this.props;
    return (
      <Content
        name={name}
        id={id}
        handleOtherInfo={this.handleOtherInfo}
        handleAddProfile={this.handleAddProfile}
        handleInputChange={this.handleInputChange}
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
