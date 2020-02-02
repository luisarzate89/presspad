import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

export const HostInfo = styled.div`
  max-width: 480px;
  margin-bottom: 2.5rem;
`;

export const HostName = styled.span`
  font-family: Roboto;
  font-weight: 900;
  font-size: 2.25rem;
  color: #595959;
  margin-bottom: 10px;
  display: block;
`;

export const JopTitle = styled.span`
  font-family: Roboto;
  font-style: italic;
  color: #595959;
  margin-bottom: 2.5rem;
  display: block;
`;

export const Bio = styled.p`
  font-family: Roboto;
  color: #595959;
`;

export const BlueLink = styled(Link)`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({ disabled }) => (disabled ? '#828282' : '#0ac7e7')};
`;
