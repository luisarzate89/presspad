import styled from "styled-components";
import { Icon as AntIcon } from "antd";

export const Wrapper = styled.div`
  width: 100%;
`;

export const ContactWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #313234;
  height: 113px;
  box-shadow: 0px 5px 20px rgba(4, 25, 105, 0.61);

  display: flex;
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
  background-color: #07294a;
  color: #ffffff;
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
  background-color: #0ac7e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(AntIcon)`
  color: #ffffff;
  font-size: 20px;
  height: 20px;
`;
