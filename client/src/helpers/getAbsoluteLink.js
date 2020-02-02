const getAbsoluteLink = link => {
  const regex = /^http[s]*:\/\/[\w]+/i;
  let url = link;
  if (link && !link.match(regex)) {
    url = `http://${link}`;
  }
  return url;
};

module.exports = getAbsoluteLink;
