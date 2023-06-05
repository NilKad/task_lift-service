const strToBoolean = str => {
  if (str === undefined) {
    return str;
  } else {
    str = str.toLowerCase();
    if (str === 'true' || str === 'false') {
      return str === 'true' ? true : false;
    }
  }
  return null;
};
module.exports = { strToBoolean };
