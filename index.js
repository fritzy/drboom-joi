'use strict';

let Boom = require('boom');

module.exports = (options) => {

  return {
    detect: (request, reply) => {
      let value = request.response;
      return (typeof value === 'object' &&
        value.hasOwnProperty('constructor') && 
        value.constructor.name === 'ValidationError');
    },
    handle: (request, reply) => {
      let value = request.response;
      throw Boom.badRequest(value.error.toString());
    }
  };

};
