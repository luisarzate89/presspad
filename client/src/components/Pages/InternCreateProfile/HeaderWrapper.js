import React from "react";

import {
  HeaderWrapper,
  HiText,
  ErrorWrapper,
  Error
} from "./InternCreateProfile.style";
import { Row, Col, Avatar } from "antd";

import { ProgressRing } from "../../Common/progress/";

export default ({ error, imageUrl, name, loading }) => {
  return (
    <HeaderWrapper>
      <Row
        gutter={20}
        style={{ alignItems: "center", display: "flex", margin: "50px 0" }}
      >
        <Col xs={24} sm={4} lg={3}>
          <ErrorWrapper>
            <div
              style={{
                textAlign: "center"
              }}
            >
              {/*neccesarry for ProgressRing*/}
              <div style={{ position: "relative", width: 86 }}>
                <ProgressRing
                  radius={43}
                  stroke={2}
                  progress={loading}
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    left: 0,
                    marginTop: -3
                  }}
                />
                <Avatar
                  size="large"
                  icon="user"
                  src={imageUrl}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "42px",
                    backgroundColor: error ? "red" : "none"
                  }}
                />
              </div>
            </div>
            <Error>{error}</Error>
          </ErrorWrapper>
        </Col>
        <Col span={20}>
          <HiText>Hi {name.split(" ")[0]}, please complete your profile</HiText>
        </Col>
      </Row>
    </HeaderWrapper>
  );
};
