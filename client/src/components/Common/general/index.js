import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageWrapper = styled.main`
  padding-top: 4rem;
  padding-bottom: 8rem;

  max-width: 1140px;
  width: 90%;
  margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
`;

export const HiText = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: #07294a;
  margin-bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const SectionWrapperContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
  padding: 25px;
  margin-bottom: 20px;
`;

export const BlueLink = styled(Link)`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.19rem;
  text-align: center;
  color: #0ac7e7;
  display: inline-block;
  margin-bottom: ${({ marginb }) => marginb};
`;

export const UpdateList = styled.ul`
  list-style: none;
`;

export const Badge = styled.span`
  background: #0ac7e7;
  border-radius: 13px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  margin-left: 10px;
  color: #ffffff;
  padding: 0 6px;
`;

export const UpdateItem = styled.li`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  color: #393939;
  margin-bottom: 0.5rem;
`;

export const BlueSpan = styled.span`
  color: #00c7e9;
`;

export const UpdateDate = styled.span`
  font-style: italic;
  font-weight: 300;
  color: #393939;
`;