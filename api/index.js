const Express = require('express');

const api = Express();
api.use(Express.json());


api.use('/planetas', require('./planetas'));


module.exports = api;