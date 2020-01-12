import styled from "styled-components";

export const CheckIcon = styled.span`
  color: #00d22b;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`;

export const CheckboxContainer = styled.label`
  display: flex;
  margin-bottom: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const StyledCheckbox = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  /* border-radius: 3px; */
  transition: all 150ms;
  border: 2px solid #c2c2c2;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 2px 1px #c2c2c2;
  }

  ${CheckIcon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`;

export const Text = styled.span`
  margin-left: 8px;
`;

export const Hint = styled(Text)`
  font-weight: 300;
  margin-bottom: 0.75rem;
`;
