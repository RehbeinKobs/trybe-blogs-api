const createError = require('../../utils/createError');

const checkEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    throw createError(400, '"email" must be a valid email');
  }
};

const checkMissingFields = (fields) => {
  if (fields.some((f) => f === undefined || f.length <= 0)) {
    throw createError(400, 'Some required fields are missing');
  }
};

const checkFieldMinLength = (field, name, length) => {
  if (field.length < length) {
    throw createError(400, `"${name}" length must be at least ${length} characters long`);
  }
};

module.exports = {
  checkMissingFields,
  checkFieldMinLength,
  checkEmail,
};
