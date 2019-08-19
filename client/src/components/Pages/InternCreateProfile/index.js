import React, { Component } from "react";
import Content from "./Content";
import { Modal, Spin, Alert, message } from "antd";
import axios from "axios";

import schema from "./Schema";

import {
  API_INTERN_COMPLETE_PROFILE,
  API_MY_PROFILE_URL
} from "../../../constants/apiRoutes";
import { HOSTS_URL } from "./../../../constants/navRoutes";

export default class InternCreateProfile extends Component {
  state = {
    attemptedToSubmit: false,
    loading: true,
    profileImage: {
      loading: 0,
      isLoading: false,
      url: ""
    },
    bio: "",
    favouriteArticle: {
      title: "",
      author: "",
      link: "",
      description: ""
    },
    jobTitle: "",
    organisation: { name: "", website: "" },
    offerLetter: {
      loading: 0,
      isLoading: false
    },
    photoIDFile: {
      loading: 0,
      isLoading: false
    },

    reference1: { name: "", contact: "" },
    reference2: { name: "", contact: "" },

    errors: {}
  };

  componentDidMount() {
    axios
      .get(API_MY_PROFILE_URL)
      .then(({ data: { profile } }) => {
        this.setState({
          ...profile,
          profileImage: {
            ...this.state.profileImage,
            ...profile.profileImage
          },
          reference1: profile.verification.reference1,
          reference2: profile.verification.reference2,
          photoIDFile: {
            ...this.state.photoIDFile,
            ...profile.verification.photoID
          },
          offerLetter: {
            ...this.state.photoIDFile,
            ...profile.verification.offerLetter
          }
        });
      })
      .catch(err => message.error("internal server error"));
  }

  directUploadToGoogle = async e => {
    const {
      files: [image],
      name,
      dataset: { isPrivate }
    } = e.target;

    const { id: userId } = this.props;
    const { errors } = this.state;

    if (!image) {
      if (!this.state[name].name) {
        return this.setState({
          errors: { ...errors, [name]: "please upload a file" }
        });
      }
      return;
    }

    if (image.size > 4e6) {
      return this.setState({
        errors: { ...errors, [name]: 'File too large, "max size 4MB"' }
      });
    }

    // get signed url from google
    try {
      this.setState({
        [name]: { ...this.state[name], loading: 0, isLoading: true }
      });

      const generatedName = `${userId}/${Date.now()}.${image.name}`;

      const {
        data: { signedUrl, bucketName }
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);

      const headers = {
        "Content-Type": "application/octet-stream"
      };

      let url = "";

      if (isPrivate === "false") {
        headers["x-goog-acl"] = "public-read";
        url = `https://storage.googleapis.com/${bucketName}/${generatedName}`;
      }
      await axios.put(signedUrl, image, {
        headers,
        onUploadProgress: progressEvent => {
          const precent = (progressEvent.loaded / progressEvent.total) * 100;
          this.setState({
            [name]: {
              loading: precent.toFixed(2),
              isLoading: true
            },
            errors: { ...errors, [name]: "" }
          });
        }
      });

      this.setState({
        [name]: {
          url,
          fileName: generatedName,
          loading: 100,
          isLoading: false
        },
        errors: { ...errors, [name]: "" }
      });
    } catch (error) {
      message.error("something went wrong, try again later", 5);
      this.setState({
        [name]: { ...this.state[name], loading: 0, isLoading: false }
      });
    }
  };

  updateErrors = async () => {
    await this.validate();
  };

  handleInputChange = ({ target }) => {
    const {
      value,
      name,
      dataset: { parent }
    } = target;
    let newState;
    if (parent) {
      const parentData = this.state[parent];
      newState = { [parent]: { ...parentData, [name]: value } };
    } else {
      newState = { [name]: value };
    }

    this.setState(
      newState,
      () => this.state.attemptedToSubmit && this.updateErrors()
    );
  };

  validate = () => {
    return schema.validate(this.state, { abortEarly: false }).catch(err => {
      const errors = {};
      err.inner.forEach(element => {
        if (element.path.startsWith("reference")) {
          errors[element.path.split(".").join("")] = element.message;
        } else {
          errors[element.path.split(".")[0]] = element.message;
        }
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
      organisation,
      offerLetter,
      photoIDFile,
      reference1,
      reference2
    } = this.state;

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

        const formData = {
          profileImage: { fileName: profileImage.fileName, isPrivate: false },
          verification: this.state.verification || {},
          bio
        };

        // Add optional fields if they exists
        favouriteArticle && (formData.favouriteArticle = favouriteArticle);
        jobTitle && (formData.jobTitle = jobTitle);
        organisation && (formData.organisation = organisation);

        photoIDFile.fileName &&
          (formData.verification.photoID = {
            fileName: photoIDFile.fileName,
            isPrivate: true
          });

        offerLetter.fileName &&
          (formData.verification.offerLetter = {
            fileName: offerLetter.fileName,
            isPrivate: true
          });
        reference1.name &&
          (formData.verification.reference1 = {
            ...formData.verification.reference1,
            name: reference1.name
          });
        reference1.contact &&
          (formData.verification.reference1 = {
            ...formData.verification.reference1,
            contact: reference1.contact
          });
        reference2.name &&
          (formData.verification.reference2 = {
            ...formData.verification.reference2,
            name: reference2.name
          });
        reference2.contact &&
          (formData.verification.reference2 = {
            ...formData.verification.reference2,
            contact: reference2.contact
          });

        axios({
          method: "post",
          url: API_INTERN_COMPLETE_PROFILE,
          data: formData,
          headers: {
            "content-type": "application/json"
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
                this.props.history.push(HOSTS_URL);
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
        directUploadToGoogle={this.directUploadToGoogle}
      />
    );
  }
}
