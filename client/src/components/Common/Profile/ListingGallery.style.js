import styled from "styled-components";

export const ImageSection = styled.section`
  margin-top: 15px;
  height: 400px;
  display: flex;
  align-items: center;
  @media (max-width: 775.98px) {
    height: auto;
    flex-direction: column;
    padding-top: 20px;
  }
`;

export const MainImageDiv = styled.div`
  width: 65%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 775.98px) {
    width: 100%;
  }
`;

export const MainImage = styled.img`
  display: block;
  width: 100%;
  height: 380px;
  object-fit: cover;
  object-position: center center;
`;

export const SideImageDiv = styled.div`
  width: 35%;
  height: 380px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
  @media (max-width: 775.98px) {
    width: 100%;
    margin-left: 0px;
  }
`;
export const SubImage = styled.img`
  display: block;
  width: 100%;
  height: 185px;
  object-fit: cover;
  object-position: center center;
`;
