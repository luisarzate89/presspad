import React from "react";

import Checkbox from "./Checkbox";

import { SectionWrapperContent, SectionTitle } from "../general";
import { Paragraph } from "../Profile/Profiles.style";

import HintText from "./HintText";

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
            hintTextElement={
              <HintText
                hintText={checklistObj[key].question.hintText}
                containsHostEmail={checklistObj[key].question.containsHostEmail}
                containsInternEmail={
                  checklistObj[key].question.containsInternEmail
                }
                containsCalendlyLink={
                  checklistObj[key].question.containsCalendlyLink
                }
                hostEmail={checklistObj[key].hostEmail}
                internEmail={checklistObj[key].internEmail}
                links={checklistObj[key].question.links}
              />
            }
          />
        ))}
      </SectionWrapperContent>
    </section>
  );
};

export default Checklist;
