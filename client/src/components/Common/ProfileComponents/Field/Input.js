import React from "react";

import { ErrorWrapper, Error } from "../ProfileComponents.style";
import { Input } from "antd";

const { TextArea } = Input;

export default function InputWithLabel({
  label,
  placeholder,
  value,
  handleChange,
  error,
  name,
  showAsTextArea,
  fullHeight,
  parent
}) {
  const onChange = e => {
    const { name, value } = e.target;
    handleChange({ value, key: name, parent });
  };

  return (
    <>
      <ErrorWrapper error={error} marginBottom="12px">
        {showAsTextArea ? (
          <TextArea
            name={name}
            onChange={onChange}
            rows={6}
            id={
              parent
                ? `${parent}${name[0].toUpperCase()}${name.slice(1)}`
                : name
            }
            placeholder={placeholder}
            value={value}
            style={{
              border: error ? "none" : "1px solid #d9d9d9",
              height: "100%",
              minHeight: fullHeight ? "230px" : undefined,
              marginBottom: fullHeight ? "2rem" : undefined
            }}
          />
        ) : (
          <Input
            name={name}
            onChange={onChange}
            id={
              parent
                ? `${parent}${name[0].toUpperCase()}${name.slice(1)}`
                : name
            }
            placeholder={placeholder}
            value={value || ""}
            data-parent="favouriteArticle"
            style={{
              border: error ? "none" : "1px solid #d9d9d9"
            }}
          />
        )}
      </ErrorWrapper>
      {error && <Error block>{error}</Error>}
    </>
  );
}
