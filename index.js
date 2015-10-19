module.exports = (options) => {


  return {
    detect: (request, reply) => {
      return (typeof request === 'object' &&
        request.hasOwnProperty('constructor') && 
        request.constructor.name === 'ValidationError');
    },
    handle (request, reply) => {
    }
  };
};
