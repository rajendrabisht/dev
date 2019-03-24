const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCustomerInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 10, max: 300 })) {
    errors.name = 'Name must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  data.address = !isEmpty(data.address) ? data.address : '';

  if (!Validator.isLength(data.address, { min: 10, max: 300 })) {
    errors.address = 'Address must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }


data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (!Validator.isLength(data.phone, { min: 10, max: 300 })) {
    errors.phone = 'Phone must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.address)) {
    errors.phone = 'Phone field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
