'use strict';

let Boom = require('boom');

function isJoiError(value) {
  return value.name === 'ValidationError';
}

function isRequestValidationError(value) {
  return value.data && value.data.name === 'ValidationError';
}

module.exports = (options) => {

  return {
    detect: (value, request) => {
      if (typeof value === 'object' && value !== null) {
        return isJoiError(value) || isRequestValidationError(value);
      }
      return false;
    },

    handle: (value) => {
      let error = Boom.badRequest(value);
      let details = {};

      if (isJoiError(value)) {
        details = value.details;
      } else if (isRequestValidationError(value)) {
        details = value.data.details;
      }

      error.output.payload.details = details;
      return error;
    }
  };

};
