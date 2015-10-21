'use strict';

let Boom = require('boom');

module.exports = (options) => {

  return {
    detect: (value, request) => {
      if (typeof value === 'object' && value !== null) {
        return value.name === 'ValidationError';
      }
      return false;
    },
    handle: (value) => {
      let error = Boom.badRequest(value);
      error.payload.details = value.details
      return error;
    }
  };

};
