import styled from "styled-components";

const ReviewWrapper = styled.section`
  padding: 2rem 0 0 10.5rem;
  display: flex;
  margin: 0 0 4rem 0;
  flex-direction: row-reverse;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  };
`;

export default ReviewWrapper;
