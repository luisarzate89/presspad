import styled from "styled-components";

export const SectionTitle = styled.h4`
  margin: 20px 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 1.56rem;
  color: #353942;
`;

export const Image = styled.img`
  max-width: 12rem;
  max-height: 12rem;
  margin-right: 30px;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    width: 8rem;
    height: 8rem;
    margin-right: 0;
    margin-bottom: 0;
  }
`;

export const HostName = styled.span`
  font-family: Roboto;
  font-weight: 900;
  font-size: 2.25rem;
  color: #595959;
  display: block;
`;

export const JopTitle = styled.span`
  font-family: Roboto;
  font-style: italic;
  color: #595959;
  margin-bottom: 1.5rem;
  display: block;
  text-transform: capitalize;
`;

export const Bio = styled.p`
  font-family: Roboto;
  color: #595959;

  @media (max-width: 600px) {
    padding: 1rem 0;
    font-size: 1rem;
  }
`;
