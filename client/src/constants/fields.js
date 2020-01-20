import React from "react";
import types from "./types";

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
    options: types.gender,
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
    options: types.interests,
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
  },
  reference1Name: {
    parent: "reference1",
    name: "name",
    label: `Reference 1 name`,
    type: "text",
    max: 50
  },
  reference1Contact: {
    parent: "reference1",
    name: "contanct",
    label: `Reference 1 contact`,
    type: "text",
    max: 50
  },
  reference2Name: {
    parent: "reference2",
    name: "name",
    label: `Reference 2 name`,
    type: "text",
    max: 50
  },
  reference2Contact: {
    parent: "reference2",
    name: "contanct",
    label: `Reference 2 contact`,
    type: "text",
    max: 50
  },
  offerLetter: {
    name: "offerLetter",
    label: `Proof of internship offer`,
    type: "file",
    hint:
      "Please upload an offer letter or something similar that can be used as proof of your internship"
  },
  internshipOfficeAddress: {
    name: "internshipOfficeAddress",
    label: `Internship office address`,
    type: "textArea",
    fullHeight: true
  },
  emergencyContactName: {
    parent: "emergencyContact",
    name: "name",
    label: `Emergency contact name`,
    type: "text",
    max: 50
  },
  emergencyContactNumber: {
    parent: "emergencyContact",
    name: "number",
    label: `Emergency contact number`,
    type: "text",
    max: 50
  },
  emergencyContactEmail: {
    parent: "emergencyContact",
    name: "email",
    label: `Emergency contact email`,
    type: "text",
    max: 50
  },
  DBSCheck: {
    type: "file",
    label: "DBS check",
    hint: (
      <span>
        If you have not completed a DBS check, please{" "}
        <a
          href="https://www.gov.uk/request-copy-criminal-record"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>{" "}
        to do this first then upload your certificate
      </span>
    )
  },
  sexualOrientation: {
    type: "select",
    label: "Sexual orientation",
    placeholder: "Please choose an option",
    name: "sexualOrientation",
    options: types.sexualOrientation
  },
  degreeLevel: {
    type: "select",
    label: "Degree level",
    placeholder: "Please choose an option",
    name: "degreeLevel",
    options: types.degreeLevel
  },
  ethnicity: {
    type: "select",
    label: "Ethnicity",
    placeholder: "Please choose an option",
    name: "ethnicity",
    options: types.ethnicity
  },
  earningOfParents: {
    type: "select",
    label: "Earnings of parents",
    placeholder: "Please choose an option",
    name: "earningOfParents",
    options: types.earningOfParents
  },
  disability: {
    type: "select",
    label: "Disability",
    placeholder: "Please choose an option",
    name: "disability",
    options: types.disability
  },
  parentsWorkInPress: {
    type: "select",
    label: "Disability",
    placeholder: "Did either of your parents work in this industry?",
    name: "parentsWorkInPress",
    options: types.parentsWorkInPress
  },
  caringResponsibilities: {
    name: "caringResponsibilities",
    label: `Caring responsibilities`,
    type: "textArea",
    fullHeight: true
  },
  allergies: {
    name: "allergies",
    label: `Allergies`,
    type: "textArea",
    fullHeight: true
  },
  backgroundAnswer: {
    name: "backgroundAnswer",
    label: `Please include anything about your background or identity that you feel PressPad should know about in helping you find the best host-mentor match eg. LGBTQ/Race/Women-only/Religion etc. If you do not have any please write none.`,
    type: "textArea",
    max: 200,
    placeholder: "No more than 200 words",
    fullHeight: true
  },
  consentedOnPressPadTerms: {
    name: "consentedOnPressPadTerms",
    label: `Do you give consent to the terms in the PressPad Media Release form?`,
    type: "yesNo"
  }
};
