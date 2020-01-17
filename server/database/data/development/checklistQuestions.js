const ChecklistQuestion = require("../../models/ChecklistQuestion");

module.exports = async () => {
  const checklistQuestions = [{
    text: "Sign contract of participation",
    isPublic: true,
    for: "both",
  }, {
    text: "Pay deposit",
    isPublic: true,
    for: "intern",
  }, {
    text: "Have you received the address of your host",
    isPublic: true,
    for: "intern",
    hintText: "If you have not received these, please email them directly at {email}",
    containsHostEmail: true,
  }, {
    text: "Have received photos of their home and interns room",
    isPublic: true,
    for: "intern",
    hintText: "If you have not received these, please email them directly at {email}",
    containsHostEmail: true,
  }, {
    text: "Video property check",
    isPublic: true,
    for: "host",
    hintText: "/calendly/",
    links: [{
      label: "Calendly",
      linkType: "calendly",
    }],
  }, {
    text: "You have provided the address to the intern",
    isPublic: true,
    for: "host",
  }, {
    text: "Send photos of their home and interns room",
    isPublic: true,
    for: "host",
    hintText: "{email}",
    containsInternEmail: true,
  }, {
    text: "Join PressPad community",
    isPublic: true,
    for: "both",
    hintText: "FB: /fb/ \n Whatsapp: /whatsapp/",
    links: [{
      label: "Facebook Group",
      linkType: "fb",
    }, {
      label: "Whatsapp Group",
      linkType: "whatsapp",
    }],
  }, {
    text: "Fill in impact pre-hosting questionnaire ",
    isPublic: true,
    for: "both",
  },
  ];

  await ChecklistQuestion.create(checklistQuestions);
};
