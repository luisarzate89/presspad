import React, { Component } from 'react';
import axios from 'axios';
import { message, Spin, Icon } from 'antd';

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  CheckIcon,
  Text,
} from './Checklist.style';

import { API_UPDATE_CHECKLIST_ANSWER } from '../../../../constants/apiRoutes';

const antIcon = <Icon type="loading" style={{ fontSize: 12 }} spin />;

/**
 * Custom checkbox
 * Source: https://codesandbox.io/s/yvp79r4251?from-embed
 */
class Checkbox extends Component {
  state = {
    isLoading: false,
  };

  handleChecklistChange = async e => {
    const {
      dataset: { id },
      checked,
    } = e.target;

    const { handleChecklistChange } = this.props;
    try {
      this.setState({ isLoading: true });
      await axios.patch(API_UPDATE_CHECKLIST_ANSWER.replace(':id', id), {
        isChecked: checked,
      });
      this.setState({ isLoading: false }, () => {
        handleChecklistChange(id, checked);
      });
    } catch (err) {
      message.destroy();
      message.error('Something went wrong, try again later');
    }
  };

  render() {
    const {
      className,
      checked,
      onChange,
      text,
      hintTextElement,
      ...props
    } = this.props;
    const { isLoading } = this.state;

    return (
      <CheckboxContainer className={className}>
        <HiddenCheckbox
          checked={checked}
          onChange={this.handleChecklistChange}
          disabled={isLoading}
          {...props}
        />
        <StyledCheckbox checked={checked}>
          {isLoading ? <Spin indicator={antIcon} /> : <CheckIcon>✓</CheckIcon>}
        </StyledCheckbox>
        <div>
          <Text>{text}</Text>
          {hintTextElement ? (
            <>
              <br />
              {hintTextElement}
            </>
          ) : null}
        </div>
      </CheckboxContainer>
    );
  }
}
export default Checkbox;
