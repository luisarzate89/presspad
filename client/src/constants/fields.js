import React from 'react';
import types from './types';

export default {
  // intern + host
  birthDate: {
    type: 'date',
    label: 'Date of birth',
    placeholder: '',
    name: 'birthDate',
    requiredForHost: true,
    requiredForIntern: true,
  },
  // intern + host
  hometown: {
    type: 'text',
    label: 'Hometown',
    name: 'hometown',
    requiredForHost: true,
    requiredForIntern: true,
  },
  // intern + host
  gender: {
    type: 'select',
    label: 'Gender',
    options: types.gender,
    placeholder: 'Please choose an option',
    name: 'gender',
    requiredForHost: true,
    requiredForIntern: true,
  },
  // intern + host
  school: {
    type: 'text',
    label: 'University / School',
    name: 'school',
    requiredForIntern: true,
  },
  // intern + host
  profileImage: {
    type: 'file',
    label: 'Upload a photo',
    name: 'fileName',
    parent: 'profileImage',
    isPrivate: false,
    requiredForHost: true,
    requiredForIntern: true,
  },
  // intern + host
  interests: {
    type: 'select',
    label: 'Area of interest',
    placeholder: 'Please choose an option',
    options: types.interests,
    name: 'interests',
    requiredForIntern: true,
  },
  // intern + host
  bio: {
    type: 'textArea',
    label: 'Bio',
    name: 'bio',
    requiredForHost: true,
    requiredForIntern: true,
    placeholder: 'No more than 250 words',
  },
  // intern + host
  organisation: {
    label: 'Name of organisation you are or are going to be working for', // intern label
    type: 'text',
    max: 10,
    name: 'organisation',
    hostLabel: 'Organisation you work for',
    internLabel: 'Name of organisation you are or are going to be working for',
    requiredForHost: true,
  },
  useReasonAnswer: {
    label: 'Explain why you want to use PressPad',
    type: 'textArea',
    placeholder: 'No more than 250 words',
    max: 250,
    name: 'useReasonAnswer',
    fullHeight: true,
    fullWidth: true,
  },
  issueAnswer: {
    label: `Tell us about an issue you would like to cover from your hometown / city that you think would be of service to your community, how you would do it and why the story is important to cover OR tell us about a recent story you wrote or project you worked on`,
    type: 'textArea',
    placeholder: 'No more than 250 words',
    max: 250,
    name: 'issueAnswer',
    fullHeight: true,
    fullWidth: true,
  },

  storyAnswer: {
    label: `Tell us a story that shows you have the determination and dedication to enter the journalism and media profession
    `,
    type: 'textArea',
    placeholder: 'No more than 250 words',
    max: 250,
    name: 'storyAnswer',
    fullHeight: true,
    fullWidth: true,
  },
  mentorDescribeAnswer: {
    label: `Describe what you are looking for in a mentor as well as your long-term career ambitions`,
    type: 'textArea',
    placeholder: 'No more than 200 words',
    max: 200,
    name: 'mentorDescribeAnswer',
    fullHeight: true,
    fullWidth: true,
  },
  // host and intern
  photoID: {
    label: `Proof of identity (eg. passport/driver’s licence)`,
    type: 'file',
    placeholder: '+ Add file',
    name: 'fileName',
    parent: 'photoID',
    isPrivate: true,
    requiredForIntern: true,
    requiredForHost: true,
  },
  // host and intern
  hearAboutPressPadAnswer: {
    label: `How did you hear about PressPad?`,
    type: 'textArea',
    placeholder: 'No more than 50 words',
    name: 'hearAboutPressPadAnswer',
    max: 50,
    fullHeight: true,
    fullWidth: true,
    requiredForIntern: true,
    requiredForHost: true,
  },
  phoneNumber: {
    label: `Phone Number`,
    type: 'text',
    placeholder: '',
    name: 'phoneNumber',
    fullHeight: true,
    max: 50,
    requiredForIntern: true,
    requiredForHost: true,
  },
  reference1Name: {
    parent: 'reference1',
    name: 'name',
    label: `Reference 1 name`,
    type: 'text',
    max: 50,
  },
  reference1Email: {
    parent: 'reference1',
    name: 'email',
    label: `Reference 1 email`,
    type: 'text',
    max: 50,
  },
  reference2Name: {
    parent: 'reference2',
    name: 'name',
    label: `Reference 2 name`,
    type: 'text',
    max: 50,
  },
  reference2Email: {
    parent: 'reference2',
    name: 'email',
    label: `Reference 2 email`,
    type: 'text',
    max: 50,
  },
  offerLetter: {
    name: 'fileName',
    parent: 'offerLetter',
    label: `Proof of internship offer`,
    type: 'file',
    hint:
      'Please upload an offer letter or something similar that can be used as proof of your internship',
    isPrivate: true,
  },
  internshipOfficeAddress: {
    name: 'internshipOfficeAddress',
    label: `Internship office address`,
    type: 'textArea',
    fullHeight: true,
  },
  emergencyContactName: {
    parent: 'emergencyContact',
    name: 'name',
    label: `Emergency contact name`,
    type: 'text',
    max: 50,
  },
  emergencyContactNumber: {
    parent: 'emergencyContact',
    name: 'phoneNumber',
    label: `Emergency contact number`,
    type: 'text',
    max: 50,
  },
  emergencyContactEmail: {
    parent: 'emergencyContact',
    name: 'email',
    label: `Emergency contact email`,
    type: 'text',
    max: 50,
  },
  DBSCheck: {
    type: 'file',
    label: 'DBS check',
    hint: (
      <span>
        If you have not completed a DBS check, please{' '}
        <a
          href="https://www.gov.uk/request-copy-criminal-record"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>{' '}
        to do this first then upload your certificate
      </span>
    ),
    parent: 'DBSCheck',
    name: 'fileName',
    isPrivate: true,
  },
  sexualOrientation: {
    type: 'select',
    label: 'Sexual orientation',
    placeholder: 'Please choose an option',
    name: 'sexualOrientation',
    options: types.sexualOrientation,
  },
  degreeLevel: {
    type: 'select',
    label: 'Degree level',
    placeholder: 'Please choose an option',
    name: 'degreeLevel',
    options: types.degreeLevel,
  },
  ethnicity: {
    type: 'select',
    label: 'Ethnicity',
    placeholder: 'Please choose an option',
    name: 'ethnicity',
    options: types.ethnicity,
  },
  parentProfession: {
    type: 'select',
    label: "Parent's profession",
    hint:
      'When you were aged 14, which best describes the sort of work the main/highest income earner in your household did in their main job?',
    placeholder: 'Please choose an option',
    name: 'parentProfession',
    options: types.parentProfession,
  },
  disability: {
    type: 'select',
    label: 'Disability',
    placeholder: 'Please choose an option',
    name: 'disability',
    options: types.disability,
  },
  parentsWorkInPress: {
    type: 'select',
    label: 'Did either of your parents work in this industry?',
    placeholder: 'Did either of your parents work in this industry?',
    name: 'parentsWorkInPress',
    options: types.parentsWorkInPress,
  },
  caringResponsibilities: {
    name: 'caringResponsibilities',
    label: `Caring responsibilities`,
    type: 'textArea',
    fullHeight: true,
  },
  allergies: {
    name: 'allergies',
    label: `Allergies`,
    type: 'textArea',
    fullHeight: true,
  },
  // intern + host
  backgroundAnswer: {
    name: 'backgroundAnswer',
    label: `Please include anything about your background or identity that you feel PressPad should know about in helping you find the best host-mentor match eg. LGBTQ/Race/Women-only/Religion etc. If you do not have any please write none.`,
    type: 'textArea',
    max: 200,
    placeholder: 'No more than 200 words',
    fullHeight: true,
    internLabel:
      'Please include anything about your background or identity that you feel PressPad should know about in helping you find the best host-mentor match eg. LGBTQ/Race/Women-only/Religion etc. If you do not have any please write none.',
    hostLabel:
      'Is there anything about your background or identity that would be helpful to an intern or guest to know about you eg. LGBTQ/Race/Women-only/Religion etc. If you do not have any please write none',
  },
  consentedOnPressPadTerms: {
    name: 'consentedOnPressPadTerms',
    label: `Do you give consent to the terms in the PressPad Media Release form?`,
    type: 'yesNo',
    requiredForIntern: true,
  },

  // host only
  jobTitle: {
    type: 'text',
    max: 10,
    name: 'jobTitle',
    label: `Job title`,
    requiredForHost: true,
  },
  workingArea: {
    type: 'select',
    options: types.workingArea,
    name: 'workingArea',
    label: `Area you work in`,
    placeholder: 'Please choose an option',
    requiredForHost: true,
  },
  hostingReasonAnswer: {
    type: 'textArea',
    name: 'hostingReasonAnswer',
    label: `Why do you want to be a PressPad host?`,
    placeholder: 'No more than 250 words',
    max: 250,
    fullHeight: true,
    fullWidth: true,
  },
  mentoringExperienceAnswer: {
    type: 'textArea',
    name: 'mentoringExperienceAnswer',
    label: `What experience do you have of mentoring?`,
    placeholder: 'No more than 250 words',
    max: 250,
    fullHeight: true,
    fullWidth: true,
  },
  industryExperienceAnswer: {
    type: 'textArea',
    name: 'industryExperienceAnswer',
    label: `What was your own experience getting into the industry like?`,
    placeholder: 'No more than 250 words',
    max: 250,
    fullHeight: true,
    fullWidth: true,
  },
  photos1: {
    type: 'file',
    label: 'Photos of your home - 1',
    name: 'fileName',
    parent: 'photos1',
    requiredForHost: true,
  },
  photos2: {
    type: 'file',
    label: 'Photos of your home - 2',
    name: 'fileName',
    parent: 'photos2',
    requiredForHost: true,
  },
  photos3: {
    type: 'file',
    label: 'Photos of your home - 3',
    name: 'fileName',
    parent: 'photos3',
    requiredForHost: true,
  },
  address: {
    type: 'mainLabel',
    label: `Address`,
    hint:
      'Please note your exact address will not be made public only the first part of your postcode',
  },
  addressline1: {
    label: 'Address Line 1',
    type: 'text',
    name: 'addressline1',
    parent: 'address',
    requiredForHost: true,
  },
  addressline2: {
    label: 'Address Line 2',
    type: 'text',
    name: 'addressline2',
    parent: 'address',
  },
  city: {
    label: 'City',
    type: 'text',
    name: 'city',
    parent: 'address',
    requiredForHost: true,
  },
  postcode: {
    label: 'Postcode',
    type: 'text',
    name: 'postcode',
    parent: 'address',
    requiredForHost: true,
  },
  availableDates: {
    type: 'dateRanges',
    name: 'availableDates',
    label: `Availability`,
    hint:
      'Please try to include as many dates as you can over the next 3 to 6 months',
    requiredForHost: true,
  },
  accommodationChecklist: {
    type: 'checklist',
    label: 'Accommodation checklist',
    name: 'accommodationChecklist',
    options: types.accommodationChecklist,
    requiredForHost: true,
  },
  neighbourhoodDescription: {
    name: 'neighbourhoodDescription',
    label: 'Your neighbourhood',
    hint:
      'Include any information about your area  - what nice things there are to do, travel options etc.',

    placeholder: 'No more than 250 words',
    max: 250,
    type: 'textArea',
    fullHeight: true,
    fullWidth: true,
  },
  otherInfo: {
    type: 'textArea',
    label: 'Other info',
    name: 'otherInfo',
    max: 250,
    placeholder: 'No more than 250 words',
    hint:
      'Include any extra information such as pets, if you are vegetarian, do you have plants, and any house rules you feel are important for potential guests to know in advance e.g. no eating in the bedroom, no shoes on in the house etc.’',
  },
  pressCard: {
    type: 'file',
    label: 'Press card / proof of current status working in the media',
    name: 'fileName',
    parent: 'pressCard',
    hint: 'Please make sure this is an image (eg. picture of a letter/email)',
  },
};
