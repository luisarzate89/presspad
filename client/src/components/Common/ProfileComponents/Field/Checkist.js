import React from "react";
import { Checkbox, Row, Col } from "antd";

// import { Checkbox } from "antd";

export default function YesNoRadio({
  placeholder,
  value,
  handleChange,
  error,
  name,
  options,
  parent,
}) {
  const onChange = _value => {
    handleChange({ value: _value, key: name, parent });
  };

  return (
    <Checkbox.Group onChange={onChange} value={value}>
      <Row>
        {options.map(option => (
          <Col xs={24} md={12} key={option} style={{ marginTop: "1rem" }}>
            <Checkbox value={option}>{option}</Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
}
