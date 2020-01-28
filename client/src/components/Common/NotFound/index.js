import React from "react";
import { Result, Button } from "antd";

const NotFound = ({ history }) => (
  <Result
    style={{ paddingTop: "5rem" }}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button onClick={() => history.push("/")} type="primary">
        Back Home
      </Button>
    }
  />
);

export default NotFound;
