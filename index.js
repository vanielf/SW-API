const dotenv = require('dotenv');
dotenv.config();

const Logger = require('./logger');
const Express = require('express');
const app = Express();

app.use(Logger.express);


app.use((req, res, next) => {
	res.sendStatus(404);
});


if(!process.env.PORT) process.env.PORT = 8080;

app.listen(process.env.PORT, () => {
	Logger.info(`Inicializado: http://localhost:${process.env.PORT}`);
});
