const winston = require('winston');

const folfer_log = './logg'

const loggerInfo = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console( { level: 'info' }),
        new winston.transports.File( { filename: folfer_log+'/info.log',  level: 'info' }),
    ]
})

const loggWarn = winston.createLogger({
    level: 'warn',
    transports: [
        new winston.transports.Console( { level: 'warn' }),
        new winston.transports.File( { filename: folfer_log+'/warn.log',  level: 'warn' }),
    ]
})

const loggError = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console( { level: 'error' }),
        new winston.transports.File( { filename: folfer_log+'/error.log',  level: 'error' }),
    ]
})


module.exports = {loggerInfo,loggWarn,loggError};