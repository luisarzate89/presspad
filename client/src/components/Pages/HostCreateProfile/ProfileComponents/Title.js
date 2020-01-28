import React from "react";

import {
  SectionTitle,
  GrayHint,
  TitleWrapper
} from "../../../Common/ProfileComponents/ProfileComponents.style";

export default function Title({ title, hint }) {
  return (
    <TitleWrapper>
      <SectionTitle>{title}</SectionTitle>
      <GrayHint>{hint}</GrayHint>
    </TitleWrapper>
  );
}
