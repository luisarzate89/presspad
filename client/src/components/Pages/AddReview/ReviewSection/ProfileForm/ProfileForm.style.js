import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileLink = styled(Link)`
  font-size: 20px;
  font-weight: 650;
  color: #0ac7e7;
  margin: 1rem 0 0 0;
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  alt: Kurwa;
`;

const RevieweeName = styled.h3`
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  color: #595959;
  max-width: 200px;
`;
const RevieweeTitle = styled.p`
  max-width: 200px;
`;

const RevieweeBio = styled.p`
  max-width: 200px;
  margin: 2rem 0 0 0;
`;

export { ProfileLink, ProfileImage, RevieweeName, RevieweeTitle, RevieweeBio };
