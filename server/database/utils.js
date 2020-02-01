const wordLengthValidator = (length, field) => ({
  validator: value => value.split(' ').length <= length,
  message: `${field} length must be less than or equal ${length} words`,
});

module.exports = {
  wordLengthValidator,
};
