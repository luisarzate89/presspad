module.exports = (length, field) => value => {
  if (value.split(' ').length <= length) {
    return value;
  }
  throw new Error(`${field} length must be less than or equal ${length} words`);
};
