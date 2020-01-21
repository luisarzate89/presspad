import styled from "styled-components";

import { colors, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export const HeaderText = styled.h2`
  margin: 3rem 0;
  width: 600px;
  text-align: center;
  color: #07294a;
  font-size: 1.7rem;
`;

export const SignUpForm = styled.form`
  background-color: ${colors.white};
  box-shadow: ${shadows.main};
  padding: 3rem 1rem;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormHeader = styled.h3`
  text-align: center;
  line-height: 30px;
  font-size: 1.25rem;
  font-weight: 300;
  padding: 0 2rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  width: 60%;
`;

export const InputLabel = styled.label`
  font-size: 1.25rem;
  color: ${colors.fontLightBlack};
  line-height: 2rem;
`;

export const InputDiv = styled.div`
  width: 50%;
  margin-bottom: 1rem;
  .ant-input {
    color: ${props =>
      props.isError ? colors.redSecond : "inherit"} !important;
  }
`;

export const DisclaimerWrapper = styled.div`
  width: 50%;
  font-size: 1rem;
`;

export const Disclaimer = styled.div`
  display: flex;
  justify-content: center;
`;

export const DisclaimerText = styled.p`
  font-weight: 300;
  padding-left: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const ErrorMsg = styled.div`
  color: ${colors.redSecond};
  margin-top: 0.4rem;
  font-size: 0.85rem;
`;

export const ButtonWrapper = styled.div`
  margin: 1.5rem 0;
`;
