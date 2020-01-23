import React, { Component } from "react";
import axios from "axios";
import { message, Icon, Tooltip } from "antd";
import { ProgressBar } from "../../progress";

import { UploadText } from "../ProfileComponents.style";

export default class File extends Component {
  state = {
    url: null,
    loading: null,
    isLoading: null,
  };

  directUploadToGoogle = async e => {
    const { name, parent, userId, isPrivate } = this.props;

    const {
      files: [image],
    } = e.target;

    if (!image) {
      if (!this.state[name].name) {
        return this.setState({
          error: "please upload a file",
        });
      }
      return undefined;
    }

    if (image.size > 4e6) {
      return this.props.handleError('File too large, "max size 4MB"');
    }

    // get signed url from google
    try {
      this.setState({
        loading: 0,
        isLoading: true,
      });

      const generatedName = `${userId}/${Date.now()}.${image.name}`;

      const {
        data: { signedUrl, bucketName },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);

      const headers = {
        "Content-Type": "application/octet-stream",
      };

      let url = "";

      if (!isPrivate) {
        headers["x-goog-acl"] = "public-read";
        url = `https://storage.googleapis.com/${bucketName}/${generatedName}`;
      }
      await axios.put(signedUrl, image, {
        headers,
        onUploadProgress: progressEvent => {
          const precent = (progressEvent.loaded / progressEvent.total) * 100;
          this.setState(
            {
              loading: precent.toFixed(2),
              isLoading: true,
              error: "",
            },
            () => {
              this.props.handleChange({
                value: generatedName,
                key: name,
                parent,
              });
              return this.props.handleError("");
            },
          );
        },
      });

      return this.setState({
        url,
        fileName: generatedName,
        loading: 100,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      message.error("something went wrong, try again later");
      return this.setState({
        loading: 0,
        isLoading: false,
      });
    }
  };

  render() {
    const { loading, isLoading, fileName } = this.state;
    const { name, parent, value, url, readOnly } = this.props;
    if (readOnly) {
      return (
        <Tooltip title="download" placement="bottomLeft">
          <UploadText as="a" href={url}>
            <Icon type="download" />
            <span style={{ marginLeft: "1rem" }}>download</span>
          </UploadText>
        </Tooltip>
      );
    }

    return (
      <div>
        {isLoading ? (
          <ProgressBar progress={loading}>
            <UploadText disabled>{fileName || value}</UploadText>
          </ProgressBar>
        ) : (
          <UploadText
            as="label"
            htmlFor={
              parent
                ? `${parent}${name[0].toUpperCase()}${name.slice(1)}`
                : name
            }
          >
            {fileName || value ? (
              <>
                <Icon type="check" style={{ color: "green" }} />
                {fileName || value}
              </>
            ) : (
              "+ Add file"
            )}
            <input
              type="file"
              id={
                parent
                  ? `${parent}${name[0].toUpperCase()}${name.slice(1)}`
                  : name
              }
              onChange={this.directUploadToGoogle}
              name={name}
              style={{ display: "none" }}
            />
          </UploadText>
        )}
        {/* if fileName === value that means that the photo just uploaded and we didn't create a url for it */}
        {url && fileName !== value && (
          <Tooltip title="download" placement="bottomLeft">
            <UploadText as="a" href={url}>
              <Icon type="download" />
            </UploadText>
          </Tooltip>
        )}
      </div>
    );
  }
}
