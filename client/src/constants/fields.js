export default {
  birthDate: {
    type: "date",
    label: "Date of birth",
    placeholder: "",
    name: "birthDate"
  },
  hometown: {
    type: "text",
    label: "Hometown",
    name: "hometown"
  },
  gender: {
    type: "select",
    label: "Gender",
    options: ["male", "female", "other", "prefer not to say"],
    placeholder: "Please choose an option",
    name: "gender"
  },
  school: {
    type: "text",
    label: "University / School",
    name: "school"
  },
  profileImage: {
    type: "file",
    label: "Upload a photo",
    name: "profileImage"
  },
  interests: {
    type: "select",
    label: "Area of interest",
    placeholder: "Please choose an option",
    options: [], // waiting for PO to send over
    name: "interests"
  },
  bio: {
    type: "textArea",
    label: "Bio",
    name: "bio"
  },
  organisation: {
    label: "Name of organisation you are or are going to be working for",
    type: "text",
    max: 10,
    name: "organisation"
  },
  useReasonAnswer: {
    label: "Explain why you want to use PressPad",
    type: "textArea",
    placeholder: "No more than 250 words",
    max: 250,
    name: "useReasonAnswer",
    fullHeight: true,
    fullWidth: true
  },
  issueAnswer: {
    label: `Tell us about an issue you would like to cover from your hometown / city that you think would be of service to your community, how you would do it and why the story is important to cover OR tell us about a recent story you wrote or project you worked on`,
    type: "textArea",
    placeholder: "No more than 250 words",
    max: 250,
    name: "issueAnswer",
    fullHeight: true,
    fullWidth: true
  },
  mentorDescribeAnswer: {
    label: `Describe what you are looking for in a mentor as well as your long-term career ambitions`,
    type: "textArea",
    placeholder: "No more than 200 words",
    max: 200,
    name: "mentorDescribeAnswer",
    fullHeight: true,
    fullWidth: true
  },
  photoID: {
    label: `Proof of identity (eg. passport/driver’s licence)`,
    type: "file",
    placeholder: "+ Add file",
    name: "photoID"
  },
  hearAboutPressPadAnswer: {
    label: `How did you hear about PressPad?`,
    type: "textArea",
    placeholder: "No more than 50 words",
    name: "hearAboutPressPadAnswer",
    max: 50
  },
  phoneNumber: {
    label: `Phone Number`,
    type: "text",
    placeholder: "",
    name: "phoneNumber",
    max: 50
  }
};
