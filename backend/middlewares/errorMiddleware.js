const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log error details for debugging
  
    // Handle different types of errors more specifically
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors, // Send back validation errors for each field
      });
    }
  
    if (err.name === 'MongoError' && err.code === 11000) {
      // Handle MongoDB duplicate key errors (e.g., for unique fields like email)
      return res.status(400).json({
        message: 'Duplicate key error',
        error: err.message,
      });
    }
  
    if (err.name === 'JsonWebTokenError') {
      // Handle JWT-related errors (invalid token)
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
  
    if (err.name === 'TokenExpiredError') {
      // Handle expired JWT token errors
      return res.status(401).json({
        message: 'Token has expired. Please log in again.',
      });
    }
  
    // For other errors, send a generic 500 internal server error response
    res.status(500).json({
      message: err.message || 'Something went wrong. Please try again later.',
      error: err, // Include the error details in the response for debugging (could be stripped out in production)
    });
  };
  
  module.exports = errorMiddleware;
  