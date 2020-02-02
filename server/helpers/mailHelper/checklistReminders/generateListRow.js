/**
 * generate an html row for the checklist
 * @param {String} checklist.text main checklist question text
 * @param {Ojbect} checklist checklist details
 * @param {String} checklist.hintText optional hint for more info
 * @param {Boolean} checklist.containsHostEmail does the hint contains host email?
 * @param {Boolean} checklist.containsInternEmail does the hint contains  intern email?
 * @param {String} checklist.hostEmail the host's email, to be concatenated in the hint text
 * @param {String} checklist.internEmail the intern's email, to be concatenated in the hint text
 * @param {Array} checklist.links list of links, to be concatenated in the hint text
 * @param {Boolean} checklist.isChecked flag to determine whether the checklist is checkerd or not
 *
 */

const generateChecklistRow = ({
  text,
  hintText,
  containsHostEmail,
  containsInternEmail,
  hostEmail,
  internEmail,
  links,
  isChecked,
}) => {
  let hintTextElement = hintText ? `<p>${hintText}</p>` : '';

  if (hintText) {
    let hintTextSegments = hintText;
    if (containsHostEmail) {
      hintTextSegments = hintText.split('{email}').filter(i => !!i);
      hintTextElement = `
        <p style="list-style: none; font-size: 14px; font-weight: 300; font-size: 14px; font-weight: 300; margin-left: 1rem; margin-top: 0;">
          ${hintTextSegments[0] || ''}
          <a
            href="${hostEmail}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${hostEmail}
          </a>
          ${hintTextSegments[1] || ''}
        </p>
        `;
    } else if (containsInternEmail) {
      hintTextSegments = hintText.split('{email}').filter(i => !!i);
      hintTextElement = `
      <p style="list-style: none; font-size: 14px; font-weight: 300; font-size: 14px; font-weight: 300; margin-left: 1rem; margin-top: 0;">
          ${hintTextSegments[0] || ''}
          <a
            href="${internEmail}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${internEmail}
          </a>
          ${hintTextSegments[1] || ''}
        </p>
      `;
    }

    if (links && links.length) {
      // split the hint text into segments
      hintTextSegments = hintText.split('/').filter(i => !!i);
      // replace the links segements with its object
      links.forEach(link => {
        const i = hintTextSegments.indexOf(link.linkType);
        hintTextSegments[i] = link;
      });
      hintTextElement = `
      <p style="list-style: none; font-size: 14px; font-weight: 300; font-size: 14px; font-weight: 300; margin-left: 1rem; margin-top: 0;">
          ${hintTextSegments
            .map(segment => {
              if (segment instanceof Object) {
                return `<a
            href="${segment.url}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${segment.label}
          </a>`;
              }
              return segment;
            })
            .join('\n')}
        </p>
      `;
    }
  }
  const mainElement = `
  <li style="color: ${
    isChecked ? 'green' : 'red'
  }; list-style: none; font-size: 16px; font-weight: 500;">
    <span>${isChecked ? '&#10004;' : '&#10005;'}</span>
    ${text}
    <br />
    ${hintTextElement}
    </li>`;

  return mainElement;
};

module.exports = generateChecklistRow;
