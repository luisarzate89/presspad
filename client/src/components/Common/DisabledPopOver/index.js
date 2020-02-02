import React from 'react';

import { Popover } from 'antd';

import { ContentWrapper } from './DisabledPopOver.style';

// wrapping the disabled elements in this component,
// will render a popover message
// accepts title, content, message, if any isn't provided then will take the default

const DisabledLink = props => {
  const { title, content, children, message, position } = props;

  const defaultContent = (
    <div>
      <p>{message || "This feature isn't available in this beta version"}</p>
    </div>
  );

  const defaultTitle = 'Comming Soon!';

  return (
    <Popover
      content={content || defaultContent}
      title={title || defaultTitle}
      placement="topLeft"
      arrowPointAtCenter
      autoAdjustOverflow
    >
      <ContentWrapper position={position}>{children}</ContentWrapper>
    </Popover>
  );
};

export default DisabledLink;
