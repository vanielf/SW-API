const Express = require('express');

const api = Express();
api.use(Express.json());


module.exports = api;