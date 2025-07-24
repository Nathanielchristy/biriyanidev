const winston = require('winston');

// Use the same logger setup as in server.js
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ],
});

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.originalUrl,
        method: req.method,
        status: err.statusCode || 500
    });
    res.status(err.statusCode || 500).json({
        message: process.env.NODE_ENV === 'development' ? (err.message || 'Server Error') : 'An error occurred',
    });
};

module.exports = errorHandler;
