import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../../theme";

export const PageWrapper = styled.main`
  padding-top: 4rem;
  padding-bottom: 8rem;

  max-width: 1140px;
  width: 90%;
  margin: 0 auto;
  @media (max-width: 575.98px) {
    width: 95%;
  }
`;

export const HeaderWrapper = styled.div`
  margin: 3rem 0;

  @media (max-width: 600px) {
    margin: 2rem 0;
  }
`;

export const HiText = styled.h1`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: #07294a;
  margin-bottom: 0;
  height: 100%;
  align-items: center;
  padding-left: 1rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding-left: 0;
  }
`;

export const SectionWrapperContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
  padding: 25px;
  padding-left: 1.875rem;
  margin-bottom: 20px;
  margin-top: ${({ mtop }) => mtop || 0};

  @media (max-width: 600px) {
    padding: 0.6rem;
    padding-left: 0.6rem;
    font-size: 1rem;
  }
`;

export const SectionTitle = styled.h4`
  margin: 20px 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 1.56rem;
  color: #353942;
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
  margin-top: ${({ margint }) => margint};
  margin-bottom: ${({ marginb }) => marginb};
  margin-left: ${({ marginl }) => marginl};

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
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

export const PayButton = styled.button`
  background: ${props =>
    props.disabled ? colors.lightGray : colors.lightBlue};
  opacity: ${props => (props.disabled ? "0.7" : "")};
  border-radius: 17.5px;
  font-size: 1rem;
  color: ${colors.white};
  border: none;
  padding: 0.5rem 5rem;
  margin: 0;
  margin-top: ${({ mtop }) => mtop || ""};
  margin-bottom: 10px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  :focus,
  :hover {
    transform: ${props => (!props.disabled ? "scale(1.05)" : "")};
  }
`;

export const InternalLink = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.19rem;
  text-align: center;
  color: #0ac7e7;
  display: inline-block;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const BoldTitle = styled.span`
  font-weight: 900;
`;

export const SectionWrapper = styled.section`
  @media (max-width: 600px) {
    max-width: 98%;
    margin: 0 auto;
  }
`;
