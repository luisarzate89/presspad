import React from "react";

import Checkbox from "./Checkbox";

import { SectionWrapperContent, SectionTitle } from "../general";
import { Paragraph } from "../Profile/Profiles.style";

const Checklist = ({ checklistObj, handleChange }) => {
  return (
    <section>
      <SectionWrapperContent>
        <SectionTitle>Your checklist</SectionTitle>
        <Paragraph>
          Please make sure to complete your checklist before your stay
        </Paragraph>
        {Object.keys(checklistObj).map(key => (
          <Checkbox
            key={key}
            checked={checklistObj[key].isChecked}
            onChange={handleChange}
            text={checklistObj[key].question.text}
            data-id={checklistObj[key]._id}
          />
        ))}
      </SectionWrapperContent>
    </section>
  );
};

export default Checklist;
