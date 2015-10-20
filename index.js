'use strict';

let Boom = require('boom');

module.exports = (options) => {

  return {
    detect: (value, request) => {
      if (typeof value === 'object' && value !== null) {
        if (value.error === null && value.hasOwnProperty('value')) {
          request.response.source = null;
        } else if (value.error !== null && value.error && value.error.name === 'ValidationError') {
          return true;
        }
      }
      return false;
    },
    handle: (value) => {
      throw Boom.badRequest(value.error.toString());
    }
  };

};
