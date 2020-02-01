const ChecklistQuestion = require("../../models/ChecklistQuestion");

module.exports = async () => {
  const checklistQuestions = [
    {
      text: "Sign contract of participation",
      isPublic: true,
      for: "both",
      order: 1,
    },
    {
      text: "Pay deposit",
      isPublic: true,
      for: "intern",
      order: 2,
    },
    {
      text: "Have you received the address of your host",
      isPublic: true,
      for: "intern",
      hintText:
        "If you have not received these, please email them directly at {email}",
      containsHostEmail: true,
      order: 3,
    },
    {
      text: "Have received photos of their home and interns room",
      isPublic: true,
      for: "intern",
      hintText:
        "If you have not received these, please email them directly at {email}",
      containsHostEmail: true,
      order: 4,
    },
    {
      text: "Video property check",
      isPublic: true,
      for: "host",
      hintText: "/calendly/",
      links: [
        {
          label: "Calendly",
          linkType: "calendly",
        },
      ],
      order: 3,
    },
    {
      text: "You have provided the address to the intern",
      isPublic: true,
      for: "host",
      order: 2,
    },
    {
      text: "Send photos of their home and interns room",
      isPublic: true,
      for: "host",
      hintText: "{email}",
      containsInternEmail: true,
      order: 4,
    },
    {
      text: "Join PressPad community",
      isPublic: true,
      for: "both",
      isOptional: true,
      hintText: "FB: /fb/ \n Whatsapp: /whatsapp/",
      links: [
        {
          label: "Facebook Group",
          linkType: "fb",
        },
        {
          label: "Whatsapp Group",
          linkType: "whatsapp",
        },
      ],
      order: 5,
    },
    {
      text: "Fill in impact pre-hosting questionnaire ",
      isPublic: true,
      for: "both",
      isOptional: true,
      order: 6,
    },
  ];

  await ChecklistQuestion.create(checklistQuestions);
};
