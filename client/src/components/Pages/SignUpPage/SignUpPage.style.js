import styled from "styled-components";

import { colors, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderText = styled.h2`
  margin: 3rem 0;
  width: 600px;
  text-align: center;
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
  margin-bottom: 2rem;
`;

export const InputLabel = styled.label`
  font-size: 1.25rem;
  color: ${colors.fontLightBlack};
  line-height: 2rem;
`;

export const InputDiv = styled.div`
  width: 50%;
  margin-bottom: 1rem;
`;

export const ReferralWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: center;
`;

export const ReferralText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

export const Disclaimer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 1rem;
`;

export const DisclaimerText = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  padding-left: 1rem;
`;

export const ErrorMsg = styled.div`
  color: ${colors.red};
`;

export const ButtonWrapper = styled.div`
  margin: 1.5rem 0;
`;
