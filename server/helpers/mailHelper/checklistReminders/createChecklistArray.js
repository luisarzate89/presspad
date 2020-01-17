const generateListRow = require("./generateListRow");


const createChecklistArray = ({
  checklist, hostEmail, internEmail,
}) => checklist.map((checklistQuestion) => {
  const {
    isChecked,
    hintText,
    containsHostEmail,
    containsInternEmail,
    links,
    text,
  } = checklistQuestion;

  const checklistHtmlRow = generateListRow({
    hintText,
    containsHostEmail,
    containsInternEmail,
    hostEmail,
    internEmail,
    links,
    isChecked,
    text,
  });

  return checklistHtmlRow;
});


module.exports = createChecklistArray;
