// Error handling middleware

module.exports = errorHandler

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
    // Custom applicationerror
    return res.status(400).json({ message: err })
  }

  if (err.name === 'ValidationError') {
    // Mongoose validatie-error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    // JWT authenticatie-error
    return res.status(401).json({ message: 'Token ongeldig, log opnieuw in' })
  }

  // Default is 500 (servererror)
  return res.status(500).json({ message: err.message })
}