import React, { Component } from "react";
import Content from "./Content";
import { Modal, Spin, Alert, message } from "antd";
import * as Yup from "yup";
import axios from "axios";

import { API_INTERN_COMPLETE_PROFILE } from "../../../constants/apiRoutes";
import { HOSTS_URL } from "./../../../constants/navRoutes";

const schema = Yup.object().shape({
  profileImage: Yup.object().shape({
    name: Yup.string().required("Required"),
    isPrivate: Yup.boolean().default(false)
  }),
  bio: Yup.string().required("Required"),
  favouriteArticle: Yup.string(),
  jobTitle: Yup.string(),
  pressPass: Yup.object().shape({
    name: Yup.string().required("Required"),
    isPrivate: Yup.boolean().default(true)
  }),

  photoIDFile: Yup.object().shape({
    name: Yup.string(),
    isPrivate: Yup.boolean().default(true)
  }),
  offerLetter: Yup.object().shape({
    name: Yup.string(),
    isPrivate: Yup.boolean().default(true)
  }),
  reference1: Yup.object().shape({
    name: Yup.string(),
    contact: Yup.string()
  }),
  reference2: Yup.object().shape({
    name: Yup.string(),
    contact: Yup.string()
  })
});

export default class InternCreateProfile extends Component {
  state = {
    attemptedToSubmit: false,
    loading: true,
    profileImage: {
      name: "",
      loading: 0,
      isLoading: false,
      dataUrl: ""
    },
    bio: "",
    favouriteArticle: "",
    jobTitle: "",

    pressPass: {
      loading: 0,
      isLoading: false,
      name: ""
    },
    offerLetter: {
      loading: 0,
      isLoading: false,
      name: ""
    },
    photoIDFile: {
      loading: 0,
      isLoading: false,
      name: ""
    },

    reference1: { name: "", contact: "" },
    reference2: { name: "", contact: "" },

    errors: {}
  };

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

      let dataUrl = "";

      if (isPrivate === "false") {
        headers["x-goog-acl"] = "public-read";
        dataUrl = `https://storage.googleapis.com/${bucketName}/${generatedName}`;
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
          dataUrl,
          name: generatedName,
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
    const { value, name } = target;

    let newState = { [name]: value };
    if (name.startsWith("reference1") || name.startsWith("reference2")) {
      const fieldName = name.replace(/reference\d/, "").toLowerCase();
      const referenceNum = name.replace("reference", "")[0];

      newState = {
        [`reference${referenceNum}`]: {
          ...this.state[`reference${referenceNum}`],
          [fieldName]: value
        }
      };
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
        errors[element.path.split(".")[0]] = element.message;
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
          profileImage: { fileName: profileImage.name, isPrivate: false },
          bio,
          favouriteArticle,
          jobTitle,
          pressPass: { fileName: pressPass.name, isPrivate: true },
          photoIDFile: { fileName: photoIDFile.name, isPrivate: true },
          offerLetter: { fileName: offerLetter.name, isPrivate: true },
          reference1,
          reference2
        };
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
