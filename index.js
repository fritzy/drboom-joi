'use strict';

let Boom = require('boom');

module.exports = (options) => {

  return {
    detect: (value, request) => {
      if (typeof value === 'object' && value.error === null && value.hasOwnProperty('value')) {
        request.response.source = null;
      }
      return (typeof value === 'object' &&
        value.error && 
        value.error.name === 'ValidationError');
    },
    handle: (value) => {
      throw Boom.badRequest(value.error.toString());
    }
  };

};
