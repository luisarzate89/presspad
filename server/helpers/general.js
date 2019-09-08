/**
 * capitalize single or combined words
 * @param {String} name -  single or combined words seperated by spaces
 */
const capitalizeName = name => name
  .split(" ")
  .map(_name => `${_name[0].toUpperCase()}${_name.slice(1)}`)
  .join(" ");

module.exports = {
  capitalizeName,
};
