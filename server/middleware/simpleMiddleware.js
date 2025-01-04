const simpleMiddleware = (req, res, next) => {
    console.log("Simple middleware executed");
    next();
  };
  
  module.exports = { simpleMiddleware };
  