import React from 'react';

import Checkbox from './Checkbox';

import { SectionWrapperContent, SectionTitle } from '../general';
import { Paragraph } from '../Profile/Profiles.style';

import HintText from './HintText';

const Checklist = ({ checklistObj, handleChange }) => {
  const optionals = [];
  return (
    <section>
      <SectionWrapperContent>
        <SectionTitle>Your checklist</SectionTitle>
        <Paragraph>
          Please make sure to complete your checklist before your stay
        </Paragraph>
        {Object.keys(checklistObj).map(key => {
          if (checklistObj[key].question.isOptional) {
            optionals.push(checklistObj[key].question);
            return null;
          }
          return (
            <Checkbox
              key={key}
              checked={checklistObj[key].isChecked}
              onChange={handleChange}
              text={checklistObj[key].question.text}
              data-id={checklistObj[key]._id}
              hintTextElement={
                <HintText
                  hintText={checklistObj[key].question.hintText}
                  containsHostEmail={
                    checklistObj[key].question.containsHostEmail
                  }
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
          );
        })}
        <div style={{ marginTop: '5vh', fontWeight: 'bold' }}>
          <div style={{ fontSize: '25px' }}>Other things to do:</div>
          <div>
            {optionals.map(
              ({
                text,
                hintText,
                containsHostEmail,
                containsInternEmail,
                containsCalendlyLink,
                links,
              }) => (
                <>
                  <div style={{ marginTop: '10px' }}>{text}</div>
                  <HintText
                    hintText={hintText}
                    containsHostEmail={containsHostEmail}
                    containsInternEmail={containsInternEmail}
                    containsCalendlyLink={containsCalendlyLink}
                    links={links}
                  />
                </>
              ),
            )}
          </div>
        </div>
      </SectionWrapperContent>
    </section>
  );
};

export default Checklist;
