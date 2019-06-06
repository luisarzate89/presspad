import styled from "styled-components";

import { colors, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  padding: 7rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

export const FirstSearchInputDiv = styled.label``;

export const SearchLabel = styled.label`
  margin-right: 0.5rem;
`;

export const SearchInputDiv = styled.div`
  margin-left: 2rem;
  display: flex;
  align-items: center;
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

export const ResultsWrapper = styled.div``;

export const ResultsText = styled.h2``;

export const Hosts = styled.div``;

export const HostResult = styled.div``;

export const HostHeader = styled.div``;

export const HostTitle = styled.p``;

export const HostLogo = styled.img``;

export const HostImg = styled.img``;

export const HostDates = styled.p``;

export const HostLocation = styled.p``;
