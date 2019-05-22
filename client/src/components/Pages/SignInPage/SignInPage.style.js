import styled from "styled-components";

import { colors, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderText = styled.h2`
  margin: 2rem 0;
`;

export const SignInForm = styled.form`
  background-color: ${colors.white};
  box-shadow: ${shadows.main};
  padding: 3rem 1rem;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputLabel = styled.label`
  font-size: 1.25rem;
  color: ${colors.fontLightBlack};
  line-height: 2rem;
`;

export const InputDiv = styled.div`
  width: 50%;
`;

export const ReferralText = styled.p``;

export const Disclaimer = styled.div``;
