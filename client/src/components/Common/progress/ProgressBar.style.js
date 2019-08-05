import styled from "styled-components";

export const Bar = styled.span`
  background: ${({ progress }) => (progress === 100 ? "green" : "blue")};
  height: 3px;
  display: block;
  width: ${({ progress }) => progress}%;
  transition: width 1s linear;
`;

export const Wrapper = styled.div`
  height: ${({ height }) => height};
  position: relative;
  @media (max-width: 575.98px) {
    height: auto;
  }
`;
