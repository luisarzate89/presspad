import styled from "styled-components";
import { Icon as AntIcon } from "antd";

import { colors } from "./../../../theme";

export const Wrapper = styled.div`
  width: 100%;
`;

export const ContactWrapper = styled.div`
  width: 100%;
  background-color: ${colors.white};
  color: ${colors.fontBlack};
  min-height: 113px;
  box-shadow: 0px 5px 20px rgba(4, 25, 105, 0.61);

  display: flex;
  flex-wrap: wrap;
`;

export const SocialMediaIconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  margin: 0 auto;
  text-align: center;
  min-width: 200px;
  padding: 20px 0;
`;

export const NewsLetter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0;
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-family: Raleway;
  font-weight: 600;
  font-size: 20px;
  line-height: 23px;
`;

export const CopyRightsWrapper = styled.div`
  width: 100%;
  background-color: ${colors.fontPrimary};
  color: ${colors.white};
  font-family: Raleway;
  font-weight: 300;
  font-size: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${colors.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    height: 20px;
  }
`;

export const Icon = styled(AntIcon)`
  color: ${colors.white};
  font-size: 20px;
  height: 20px;
`;
