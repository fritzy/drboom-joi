'use strict';

module.exports = (options) => {

  return {
    detect: (value, request) => {
      if (typeof value === 'object' && value !== null) {
        return value.name === 'ValidationError';
      }
      return false;
    },
    handle: (value) => {
      let error = options.Boom.badRequest(value);
      return error;
    }
  };

};
