'use strict';

let Boom = require('boom');

module.exports = (options) => {

  return {
    detect: (value, request) => {
      if (typeof value === 'object' && value !== null) {
        return value.isBoom === true;
      }
      return false;
    },
    handle: (value) => {
      return Boom.badRequest(value);
    }
  };

};
