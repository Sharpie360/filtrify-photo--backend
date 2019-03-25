const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${req.originalUrl} ... ${new Date(
      Date.now()
    ).toLocaleDateString()} ... ${new Date(Date.now()).toLocaleTimeString()}`
  );
  next();
};

module.exports = logger;
