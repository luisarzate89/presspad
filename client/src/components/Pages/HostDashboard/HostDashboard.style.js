import styled from "styled-components";
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

export const HeaderWrapper = styled.div`
  margin-bottom: 60px;
  margin-top: 50px;
`;

export const HiText = styled.h1`
  font-family: Roboto;
  font-weight: 500;
  font-size: 30px;
  padding: 0.5rem 0;
  color: #07294a;
  margin-bottom: 0;
  align-items: center;
`;

export const BoldTitle = styled.span`
  font-weight: 900;
`;

export const SectionWrapperContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
  padding: 25px;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h4`
  margin: 20px 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 1.56rem;
  color: #353942;
`;

export const UpdateList = styled.ul`
  list-style: none;
`;

export const BookingsTableWrapper = styled.div`
  tr,
  td {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    color: #393939;
  }

  .ant-table-thead tr {
    background-color: transparent;
  }
`;

export const BlueLink = styled.div`
  color: ${colors.links};
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
`;

export const ListItem = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #393939;
  margin: 1.25rem 0;
  text-align: center;
`;

export const Number = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 25px;
  text-align: center;
  color: ${({ blue }) => (blue ? "#0ac7e7" : "#393939")};
  margin: 1.25rem 0;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 360px;
  margin: 0 auto;
`;

export const ModalTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;

  color: #07294a;
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  min-height: 285px;
  justify-content: space-between;

  & > * {
    margin-top: 0.75rem;
  }
`;

export const ModalDescription = styled.span`
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? "bold" : 300)};
  font-size: ${({ large }) => (large ? "25px" : "16px")};
  line-height: 25px;

  color: #393939;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;

  color: #393939;
  text-align: right;
  width: 100%;
  display: inline-block;
`;
