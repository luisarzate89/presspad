import styled from "styled-components";

import { colors, shadows, size } from "../../../theme";

export const Wrapper = styled.div`
  padding: 6rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${size.mobileXL}) {
    padding: 4rem 1rem;
  }
`;

export const HeaderText = styled.h2`
  margin: 3rem 0;
  max-width: ${size.mobileXL};
  text-align: center;
  color: #07294a;
  font-size: 1.7rem;

  @media (max-width: ${size.mobileXL}) {
    font-size: 1.5rem;
  }
`;

export const SignUpForm = styled.form`
  background-color: ${colors.white};
  box-shadow: ${shadows.main};
  padding: 3rem 10rem;
  max-width: ${size.laptop};
  min-width: ${size.mobileXL};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${size.mobileXL}) {
    min-width: 300px;
    padding: 2rem 4rem;
  }

  @media (max-width: ${size.mobileL}) {
    padding: 2rem 1rem;
  }
`;

export const FormHeader = styled.h3`
  text-align: center;
  line-height: 30px;
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0 auto;
  margin-bottom: 2rem;
  max-width: ${size.mobileL};

  @media (max-width: ${size.mobileXL}) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`;

export const InputLabel = styled.label`
  font-size: 1.25rem;
  color: ${colors.fontLightBlack};
  line-height: 2rem;
`;

export const InputDiv = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  max-width: ${size.mobileL};

  .ant-input {
    color: ${props =>
      props.isError ? colors.redSecond : "inherit"} !important;
  }
`;

export const DisclaimerWrapper = styled.div`
  max-width: 425px;
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
