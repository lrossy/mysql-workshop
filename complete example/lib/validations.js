const validate = require('validate.js');
const moment = require('moment');

const VALID_ID = {
  onlyInteger: true,
  greaterThan: 0
};

const USER_VALIDATION = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 characters'
    }
  },
  firstName: {
    presence: false,
    length: {
      minimum: 1,
      message: 'You must create a first name'
    }
  },
  lastName: {
    presence: false,
    length: {
      minimum: 1,
      message: 'You must create a last name'
    }
  }
};
exports.user = function validateUser(userData) {
  return validate(userData, USER_VALIDATION);
};

const ID_VALIDATION = (id_field) => {
  let obj = {};
  obj[id_field] = {
    presence: true,
    numericality: VALID_ID
  };
  return obj;
};


exports.checkId = function validateId(idObj, id_field = 'id') {
  return validate(idObj, ID_VALIDATION(id_field));
};

const CREDS_VALIDATION = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true
  }
};
exports.credentials = function validateCredentials(credsData) {
  return validate(credsData, CREDS_VALIDATION);
};

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    let format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});


validate.validators.dateAfter = function(value, options, key, attributes) {
  /*
  Todo: this should probably fail if the dates are the same.
   */
  let leastEnd = moment(value, 'YYYY-MM-DD').utc();
  let otherValue = attributes[options.attribute];
  let leastStart = moment(otherValue, 'YYYY-MM-DD').utc();

  if(leastEnd.isValid()) {
    if (leastEnd.isBefore(leastStart)) {
      return "is before start date";
    }
  }
};
