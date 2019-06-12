import styled from "styled-components";

import { colors } from "./../../../theme";

export const Wrapper = styled.div`
  padding-top: 6rem;

  height: 100%;
`;

export const TopSection = styled.div`
  background-color: ${colors.white};
  padding: 0 10rem;
`;

export const Title = styled.h2`
  color: ${colors.primary};
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 3rem;
`;

export const DashboardMenu = styled.div`
  display: flex;
`;

export const MenuItem = styled.div`
  margin-right: 3rem;
  margin-bottom: 0;
  font-size: 1.5rem;
  color: ${props => (props.active ? colors.secondary : colors.gray)};
  font-weight: 500;
  cursor: pointer;
  position: relative;

  &:after {
    content: " ";
    position: absolute;
    width: ${props => props.active && "100%"};
    left: 0;
    bottom: -3px;
    border-bottom: 3px ${colors.secondary} solid;
  }
`;

export const MainSection = styled.div`
  background-color: ${colors.blueGray};
  width: 100%;
  display: flex;
  padding: 4rem 10rem;
`;

export const ContentTitle = styled.h3``;

export const SearchWrapper = styled.div``;

export const SearchInput = styled.input``;

export const Filters = styled.input``;

export const ResultsWrapper = styled.div``;
