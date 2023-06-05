const errorHandler = (error, req, res, next) => {
  console.log(error);
  errEvent = { code: error.status, message: error.message };
  if (error.data) errEvent.data = error.data;

  res.status(error.status ? error.status : 500).json(errEvent);
};

module.exports = errorHandler;
