import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #07294a;
  color: #ffffff;
  z-index: 1;
`;

export const Menu = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

export const Item = styled.li`
  list-style: none;
  margin-left: ${props => (props.logo ? 0 : "50px")};
  font-family: Roboto;
  font-weight: 500;
  font-size: 20px;
  margin-right: ${props => (props.logo ? "auto" : "initial")};

  a {
    color: inherit;
    text-decoration: none;
  }
  .active {
    font-weight: bold;
    font-size: 20px;
  }
`;

export const Logo = styled.img`
  max-width: 136px;
`;
