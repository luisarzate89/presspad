import React from "react";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  CheckIcon,
  Text
} from "./Checklist.style";

/**
 * Custom checkbox
 * Source: https://codesandbox.io/s/yvp79r4251?from-embed
 */
export default function Checkbox({
  className,
  checked,
  onChange,
  text,
  hintTextElement,
  ...props
}) {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
      <StyledCheckbox checked={checked}>
        <CheckIcon>✓</CheckIcon>
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
