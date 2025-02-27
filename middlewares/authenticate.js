import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from " <token>"
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log(token)
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }
  
      req.user = user; // Attach the decoded user payload to the request object
      next(); // Proceed to the next middleware or route handler
    });
  };