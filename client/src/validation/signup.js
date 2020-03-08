const { object, string, ref } = require('yup');
const { signup } = require('../constants/errorMessages');

const {
  NAME_REQUIRED,
  NAME_SHORT,
  NAME_LONG,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  ORGANISATION_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_SHORT,
  PASSWORD_NOT_MATCH,
  PASSWORD_WEAK,
  PASSWORD_CONFIRM_REQUIRED,
  ROLE_INVALID,
  ROLE_REQUIRED,
} = signup;

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const schema = object({
  name: string()
    .required(NAME_REQUIRED)
    .min(3, NAME_SHORT)
    .max(15, NAME_LONG),
  email: string()
    .email(EMAIL_INVALID)
    .required(EMAIL_REQUIRED),
  organisation: string().when('role', {
    is: 'organisation',
    then: string().required(ORGANISATION_REQUIRED),
    otherwise: string(),
  }),
  password: string()
    .min(8, PASSWORD_SHORT)
    .matches(passwordPattern, PASSWORD_WEAK)
    .required(PASSWORD_REQUIRED),
  passwordConfirm: string()
    .oneOf([ref('password')], PASSWORD_NOT_MATCH)
    .required(PASSWORD_CONFIRM_REQUIRED),
  role: string()
    .oneOf(['intern', 'host', 'organisation'], ROLE_INVALID)
    .required(ROLE_REQUIRED),
});

module.exports = schema;
