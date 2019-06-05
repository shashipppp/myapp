const logger = require('../../logger');

module.exports = (req,res,next)=>{
      logger.info(` ${req.originalUrl} - ${req.method} - ${req.ip}`);
      next();
}