import React, { Component } from "react";
import Content from "./Content";
import { Modal, Spin, Alert } from "antd";
import * as Yup from "yup";
import axios from "axios";

import { API_INTERN_COMPLETE_PROFILE } from "../../../constants/apiRoutes";
import { DASHBOARD_URL } from "./../../../constants/navRoutes";

const schema = Yup.object().shape({
  profileImage: Yup.mixed().required("Required"),

  bio: Yup.string().required("Required"),
  favouriteArticle: Yup.string(),
  jobTitle: Yup.string(),
  pressPass: Yup.mixed().required("Required")
});

export default class InternCreateProfile extends Component {
  state = {
    attemptedToSubmit: false,
    loading: true,
    profileImage: {
      dataUrl: null,
      file: null
    },
    bio: "",
    favouriteArticle: "",
    jobTitle: "",

    pressPass: {
      dataUrl: null,
      file: null
    },
    offerLetter: {
      dataUrl: null,
      file: null
    },
    photoIDFile: {
      dataUrl: null,
      file: null
    },
    errors: {}
  };

  handleAddFile = ({ target }) => {
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

  updateErrors = async () => {
    await this.validate();
  };

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      { [name]: value },
      () => this.state.attemptedToSubmit && this.updateErrors()
    );
  };

  validate = () => {
    const { profileImage, pressPass, offerLetter, photoIDFile } = this.state;

    const state = {
      ...this.state,
      profileImage: profileImage.file,
      pressPass: pressPass.dataUrl,
      offerLetter: offerLetter.dataUrl,
      photoIDFile: photoIDFile.dataUrl
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
    const {
      profileImage,
      bio,
      favouriteArticle,
      jobTitle,
      pressPass,
      offerLetter,
      photoIDFile
    } = this.state;

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

        // info
        bio && form.append("bio", bio);
        favouriteArticle && form.append("favouriteArticle", favouriteArticle);
        jobTitle && form.append("jobTitle", jobTitle);

        // files
        profileImage.file && form.append("profileImage", profileImage.file);
        pressPass.file && form.append("pressPass", pressPass.file);
        offerLetter.file && form.append("offerLetter", offerLetter.file);
        photoIDFile.file && form.append("photoIDFile", photoIDFile.file);

        axios({
          method: "post",
          url: API_INTERN_COMPLETE_PROFILE,
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

  render() {
    const { name, id } = this.props;

    return (
      <Content
        name={name}
        id={id}
        state={this.state}
        handleAddFile={this.handleAddFile}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
