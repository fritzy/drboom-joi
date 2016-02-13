'use strict';

let tape = require('tape');
let hapi = require('hapi');
let drboom_joi = require('../index');
let Boom = require('boom');
let Joi = require('joi');
let drboom = require('drboom');

let validate = Joi.object({
  name: Joi.string().max(5)
});

let server = new hapi.Server();
server.connection();

server.route({
  method: 'post',
  path: '/',
  config: {
    handler: (request, reply) => {
      const val = validate.validate(request.payload);
      reply(val.error, 'hi there')
    }
  }
});

server.register([
  {
    register: drboom,
    options: {
      plugins: [drboom_joi({Boom})]
    }
  }
], (err) => {
  tape('fail test', (test) => {
    test.plan(1);

    server.inject({
      method: 'post',
      url: '/',
      payload: '{"name": "supercalifrajulistic"}'
    }, (res) => {
      test.equals(res.statusCode, 400, 'failure is 400')
    });
  });

  tape('pass test', (test) => {
    test.plan(1);

    server.inject({
      method: 'post',
      url: '/',
      payload: '{"name": "super"}'
    }, (res) => {
      test.equals(res.statusCode, 200, 'success is 200')
    });
  });
});

