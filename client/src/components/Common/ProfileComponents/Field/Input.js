import React from 'react';

import { Input } from 'antd';
import { ErrorWrapper, Error } from '../ProfileComponents.style';

const { TextArea } = Input;

export default function InputWithLabel({
  placeholder,
  value,
  handleChange,
  error,
  name,
  showAsTextArea,
  fullHeight,
  parent,
  readOnly = false,
}) {
  const onChange = ({ target: { name: fieldName, value: fieldValue } }) => {
    handleChange({ key: fieldName, value: fieldValue, parent });
  };

  return (
    <>
      <ErrorWrapper error={error} marginBottom="12px" fullHeight={fullHeight}>
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
              border: error ? 'none' : '1px solid #d9d9d9',
              height: '100%',
              minHeight: fullHeight ? '230px' : undefined,
            }}
            readOnly={readOnly}
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
            value={value || ''}
            data-parent="favouriteArticle"
            style={{
              border: error ? 'none' : '1px solid #d9d9d9',
            }}
            readOnly={readOnly}
          />
        )}
      </ErrorWrapper>
      {error && <Error block>{error}</Error>}
    </>
  );
}
