import styled from 'styled-components';
import { colors } from '../../../theme';

export const Wrapper = styled.div`
  color: ${colors.fontLightBlack};
  padding: 2rem;
`;

export const MainTitle = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  margin-bottom: 1.75rem;
`;

export const ReviewWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const SubTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  margin-right: 1rem;
`;

export const ReviewBody = styled.h3`
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
`;
