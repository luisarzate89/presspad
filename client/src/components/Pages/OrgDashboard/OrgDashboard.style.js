import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageWrapper = styled.div`
  padding-top: 4rem;
  padding-bottom: 8rem;
`;

export const ContentWrapper = styled.div`
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

export const UpdateList = styled.ul`
  list-style: none;
`;

export const UpdateItem = styled.li`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #393939;
`;

export const BlueSpan = styled.span`
  color: #00c7e9;
`;

export const UpdateDate = styled.span`
  font-style: italic;
  font-weight: 300;

  color: #393939;
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

export const ProfileImage = styled.img`
  max-width: 100%;
  height: 200px;
  width: 100%;
  object-fit: contain;
`;

export const InfoTable = styled.table`
  width: 100%;
  border-spacing: 1em 0.5em;
`;

export const InfoTableRow = styled.tr``;

export const TD = styled.td`
  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;

  color: ${({ position }) => (position === "right" ? "#0AC7E7" : "#353942")};
  text-align: ${({ position }) =>
    position === "right" ? "left" : position === "left" ? "right" : "center"};

  font-weight: ${({ position }) =>
    position === "center" ? "500" : position === "left" ? "normal" : "bold"};

  border: 10px solid transparent;
`;

export const TH = styled.th`
  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;

  color: ${({ position }) => (position === "right" ? "#0AC7E7" : "#353942")};
  text-align: ${({ position }) =>
    position === "right" ? "left" : position === "left" ? "right" : "center"};
  border: 10px solid transparent;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 84px;
`;

export const BlueLink = styled(Link).attrs({ to: "#" })`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({ disabled }) => (disabled ? "#828282" : "#0ac7e7")};
`;

export const InternsTableWrapper = styled.div`
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
  color: ${({ red }) => (red ? "red" : "#393939")};
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

export const Error = styled.p`
  position: absolute;
  top: 100%;
  color: red;
  font-size: 12px;
  font-style: italic;
`;

export const ErrorWrapper = styled.div`
  border: ${({ error }) => (error ? "1px solid red" : "initial")};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  border-radius: 4px;
  position: relative;
`;
