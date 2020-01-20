import React from "react";

import { ErrorWrapper, Error } from "./ProfileComponents.style";
import { Input } from "antd";

const { TextArea } = Input;

export default function InputWithLabel({
  label,
  placeholder,
  value,
  onChange,
  error,
  name,
  showAsTextArea
}) {
  return (
    <>
      <ErrorWrapper error={error} marginBottom="12px">
        {showAsTextArea ? (
          <TextArea
            name={name}
            onChange={onChange}
            rows={6}
            id={name}
            placeholder={placeholder}
            value={value}
            style={{
              border: error ? "none" : "1px solid #d9d9d9",
              height: "100%"
            }}
          />
        ) : (
          <Input
            name={name}
            onChange={onChange}
            id={name}
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
