import React from 'react';
import { Hint } from './Checklist.style';
import getAbsoluteLink from '../../../../helpers/getAbsoluteLink';

const HintElement = ({
  hintText,
  containsHostEmail,
  containsInternEmail,
  hostEmail,
  internEmail,
  links,
}) => {
  if (!hintText) {
    return null;
  }

  let hintTextSegments = hintText;
  let hintTextElement = <Hint>{hintText}</Hint>;
  if (containsHostEmail) {
    hintTextSegments = hintText.split('{email}');
    hintTextElement = (
      <Hint>
        {hintTextSegments[0]}
        <a
          href={getAbsoluteLink(hostEmail)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {hostEmail}
        </a>
        {hintTextSegments[1]}
      </Hint>
    );
  } else if (containsInternEmail) {
    hintTextSegments = hintText.split('{email}');
    hintTextElement = (
      <Hint>
        {hintTextSegments[0]}
        <a
          href={getAbsoluteLink(internEmail)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {internEmail}
        </a>
        {hintTextSegments[1]}
      </Hint>
    );
  }
  if (links && links.length) {
    // split the hint text into segments
    hintTextSegments = hintText.split('/');
    // replace the links segements with its object
    links.forEach(link => {
      const i = hintTextSegments.indexOf(link.linkType);
      hintTextSegments[i] = link;
    });
    hintTextElement = (
      <Hint>
        {hintTextSegments.map(segment => {
          if (segment instanceof Object) {
            return (
              <a
                href={getAbsoluteLink(segment.url)}
                target="_blank"
                rel="noopener noreferrer"
                key={segment.label}
              >
                {segment.label}
              </a>
            );
          }

          return segment;
        })}
      </Hint>
    );
  }
  return hintTextElement;
};

export default HintElement;
