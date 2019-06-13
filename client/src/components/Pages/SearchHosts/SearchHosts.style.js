import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, size } from "./../../../theme";

export const Wrapper = styled.div`
  padding: 7rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${size.laptop}) {
    padding: 7rem 2rem;
  }
`;

export const Header = styled.div`
  padding: 0 3rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const HeaderTitle = styled.h1`
  font-weight: 900;
  color: ${colors.gray};
  font-size: 2rem;
`;

export const HeaderText = styled.p`
  text-align: justify;
  padding-left: 7rem;
  padding-right: 7rem;
  font-weight: 300;
`;

export const SearchForm = styled.form`
  display: flex;
  background-color: ${colors.white};
  padding: 2rem;
  box-shadow: ${shadows.main};
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  @media (max-width: ${size.laptop}) {
    padding: 2rem 1rem;
  }
`;

export const FirstSearchInputDiv = styled.label`
  @media (max-width: ${size.tablet}) {
    margin-bottom: 1rem;
  }
`;

export const SearchLabel = styled.label`
  margin-right: 0.5rem;
`;

export const SearchInputDiv = styled.div`
  margin-left: 2rem;
  display: flex;
  align-items: center;

  /* this styling is currently in here to make interests inactive */
  position: relative;
  :after {
    content: " ";
    width: ${props => props.disabled && "100%"};
    height: ${props => props.disabled && "100%"};
    background: rgba(255, 255, 255, 0.6);
    cursor: not-allowed;
    position: absolute;
  }

  @media (max-width: ${size.laptop}) {
    margin-left: 1rem;
  }

  @media (max-width: ${size.tablet}) {
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;

export const ErrorMsg = styled.div`
  color: ${colors.red};
  margin-top: 1rem;
`;

export const SearchButton = styled.button`
  position: relative;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: 0;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: all ease 0.15s;

  &:hover,
  &:active {
    color: ${colors.primary};
  }

  &:active {
    font-size: 0.8rem;
  }
`;

export const ResultsWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
`;

export const ResultsText = styled.h2`
  text-align: left;
  width: 100%;
  color: ${colors.gray};
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const Hosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props =>
    props.underThree ? "flex-start" : "space-between"};
`;

export const HostResult = styled(Link)`
  width: 31%;
  background: ${colors.white};
  box-shadow: ${shadows.main};
  color: ${colors.fontLightBlack};
  margin-bottom: 1.25rem;
  margin-right: ${props => props.underThree && "1.25rem"};
  transition: all ease 0.15s;
  cursor: pointer;

  &:hover {
    color: ${colors.fontLightBlack};
  }

  &:active {
    color: ${colors.fontLightBlack};
  }
`;

export const DisabledHostResult = styled.div`
  width: 31%;
  background: ${colors.white};
  box-shadow: ${shadows.main};
  color: ${colors.fontLightBlack};
  margin-bottom: 1.25rem;
  margin-right: ${props => props.underThree && "1.25rem"};
  cursor: not-allowed;
`;

export const HostHeader = styled.div`
  padding: 1rem;
`;

export const HostTitle = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
  text-transform: capitalize;
  margin-bottom: 0;
`;

export const HostLogo = styled.img``;

export const HostImg = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  height: 200px;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
`;

export const HostDates = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
  text-transform: capitalize;
  padding: 0 1rem;
  margin-bottom: 0;
`;

export const HostLocation = styled.p`
  font-weight: 300;
  text-transform: capitalize;
  padding: 1rem;
`;

export const SignUpPromo = styled(Link)`
  font-weight: 500;
  text-align: center;
  color: ${colors.gray};
  padding-top: 1rem;
  font-size: 1.5rem;

  :hover {
    color: ${colors.primary};
  }
`;
