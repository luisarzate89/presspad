import React from 'react';

import { Radio } from 'antd';
import { Error } from '../ProfileComponents.style';

export default function YesNoRadio({
  value,
  handleChange,
  error,
  name,
  parent,
}) {
  const onChange = ({ target: { value: change } }) =>
    handleChange({ value: change, key: name, parent });

  return (
    <>
      <Radio.Group onChange={onChange} value={!!value}>
        <Radio value>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
      {error && <Error>{error}</Error>}
    </>
  );
}
