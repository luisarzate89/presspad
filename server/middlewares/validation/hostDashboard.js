const Joi = require('@hapi/joi');

const withdrawSchema = Joi.object({
  bankName: Joi.string().required('Required'),
  bankSortCode: Joi.string().required('Required'),
  accountNumber: Joi.string().required('Required'),
  amount: Joi.number()
    .required('Required')
    .min(1, 'must be valid value'),
});

const donateSchema = Joi.object({
  amount: Joi.number()
    .required('Required')
    .min(1, 'must be valid value'),
});

module.exports = {
  withdrawSchema,
  donateSchema,
};
