const Winston = require('winston');
const ExpressWinston = require('express-winston');

const {
	format, transports
} = Winston;

const logger = Winston.createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: process.env.npm_package_name },
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple()
			)
		})
	]
});

logger.express = ExpressWinston.logger({
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple()
			)
		})
	],
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	meta: true,
	expressFormat: true,
	colorize: true,
});

module.exports = logger;