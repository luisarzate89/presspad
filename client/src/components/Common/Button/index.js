import React from "react";
import styled, { css } from "styled-components";

import { colors } from "../../../theme";

const sharedStyles = css`
  position: relative;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: 0;
  margin: ${props => props.margin || 0};
  color: ${colors.profileFontColor};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${props => props.disabled && !props.loading && 0.3};
  font-size: 1rem;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: none;
  }

  &:active::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: ${({ nobgc }) => (nobgc ? "none" : colors.transGray)};
    box-shadow: none;
  }
`;

export const roundStyles = css`
  height: ${props => props.height || "35px"};
  width: ${props => props.width || "158px"};
  border-radius: 17.5px;

  &::after {
    border-radius: 17.5px;
  }
`;

export const squareStyles = css`
  height: ${props => props.height || "35px"};
  width: ${props => props.width || "158px"};
`;

export const primaryStyles = css`
  background-color: ${colors.primary};
  color: ${colors.white};
`;

export const secondaryStyles = css`
  background-color: ${colors.secondary};
  color: ${colors.white};
`;

export const cancelStyles = css`
  background: ${({ nobgc }) => (nobgc ? "none" : colors.orange)};
  color: ${({ nobgc }) => (nobgc ? colors.blue : colors.white)};
`;

export const outlineStyles = css`
  background-color: ${colors.white};
  color: ${props => colors[props.color] || colors.profileFontColor};
  border: 1px solid;
  border-color: ${props => colors[props.color] || colors.profileFontColor};
`;

const StyledButton = styled.button`
  ${sharedStyles};
  ${props => props.type === "primary" && roundStyles}
  ${props => props.type === "primary" && primaryStyles}
  ${props => props.type === "secondary" && secondaryStyles}
  ${props => props.type === "secondary" && roundStyles}
  ${props => props.type === "cancel" && roundStyles}
  ${props => props.type === "cancel" && cancelStyles}
  ${props => props.type === "outline" && roundStyles}
  ${props => props.type === "outline" && outlineStyles}
  ${props => props.type === "verification" && squareStyles}
  ${props => props.type === "verification" && outlineStyles}
`;

const Button = ({ label, ...props }) => {
  return (
    <StyledButton aria-label={label} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
