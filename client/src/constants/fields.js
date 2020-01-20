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
  }
};
