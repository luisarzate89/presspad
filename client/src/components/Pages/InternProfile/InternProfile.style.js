import styled from "styled-components";
import { ReactComponent as BackArrowIcon } from "../../../assets/back-arrow.svg";
import { Link } from "react-router-dom";
import { colors } from "../../../theme";

export const PageWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 8rem;
`;

export const ContentWrapper = styled.div`
  max-width: 1140px;
  width: 80%;
  margin: 0 auto;
`;

export const BackLinkDiv = styled.div`
  margin-left: -10px;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
`;

export const Arrow = styled(BackArrowIcon)`
  width: 4vw;
`;

export const BackLink = styled(Link)`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
`;

export const HeaderWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
`;

export const HiText = styled.h1`
  font-family: Roboto;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: #07294a;
  margin-bottom: 0;
  height: 100%;
  align-items: center;
`;

export const Section = styled.div``;

export const SectionTitle = styled.h4`
  margin: 20px auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  color: #353942;
`;

export const SectionWrapperContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
  padding: 25px;
  margin-bottom: 20px;
`;

export const SubTitle = styled.h3`
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  color: #393939;
`;

export const Paragraph = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  line-height: 25px;
  font-size: 16px;
  color: #393939;
`;

export const Details = styled(Paragraph)`
  font-weight: normal;
  line-height: 25px;
`;

export const FileDetails = styled(Details)`
  font-size: 16px;
  color: #0ac7e7;
  cursor: pointer;
`;
export const BoldSpan = styled.span`
  color: #393939;
  font-weight: normal;
  display: block;
  margin-bottom: 25px;
`;

export const BlueSpan = styled.span`
  color: #0a7ae7;
`;

export const BookingsTableWrapper = styled.div`
  tr,
  td {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #2c2c2c;
  }

  .ant-table-thead tr {
    background-color: transparent;
  }
`;
