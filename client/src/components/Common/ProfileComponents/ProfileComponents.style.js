import styled from "styled-components";
import { colors, size } from "../../../theme";

export const SectionWrapper = styled.div``;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 1rem;
  margin-top: 1.5rem;

  @media (max-width: ${size.mobileXL}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h3`
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  color: #353942;
  margin: 0 1rem 0 0;

  :before {
    content: "";
    display: block;
    width: 8px;
    background: ${colors.fontPrimary};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
`;

export const GrayHint = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #353942;
  opacity: 0.6;
  margin: 0;
`;

export const FieldWrapper = styled.div`
  padding: ${({ padding }) => padding && padding};
`;

export const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: ${({ light }) => (light ? "lighter" : "bold")};
  line-height: 25px;
  color: #393939;
  display: block;

  @media (max-width: 767px) {
    padding: ${({ padding }) => padding && padding};
  }

  @media (max-width: 575px) {
    padding: ${({ paddingSmall }) => paddingSmall && paddingSmall};
  }
`;

export const SectionContent = styled.div`
  padding: 2rem 0;
`;

export const ErrorWrapper = styled.div`
  border: ${({ error }) => (error ? "1px solid red" : "initial")};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  height: ${({ fullHeight }) => (fullHeight ? "auto" : "calc(100% - 27px)")};
  border-radius: 4px;
  position: relative;

  .ant-select-disabled .ant-select-selection {
    background: transparent;
    cursor: auto;
  }

  input:read-only,
  textarea:read-only {
    color: #8a8a8a;
    background: #fff;
  }
`;

export const Error = styled.p`
  position: ${({ block }) => (block ? "block" : "absolute")};
  top: 100%;
  color: red;
  font-size: 12px;
  font-style: italic;
`;

export const UploadText = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #0ac7e7;
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: block;
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #393939;
  max-width: 550px;
  margin: 1rem 0;
`;

export const RequiredSpan = styled.span`
  opacity: 0.6;
  font-weight: normal;
  font-size: 14px;
  margin-left: 0.5rem;
`;
