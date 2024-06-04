module.exports = (error, req, resp, next) => {
  console.error("errorHandler", error);
  resp.sendStatus(500);
};
