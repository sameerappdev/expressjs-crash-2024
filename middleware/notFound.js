// Handle Invalid Route Requests
const notFound = ( req, res, next) => {
  const error = new Error(`URL doesn't exist`);
  error.status = 404;
  return next(error);
};

export default notFound;
