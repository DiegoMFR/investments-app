const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Middleware to serve static files
app.use('/product/overview/content/mybnd', express.static(path.join(__dirname, '../content/mybnd')))

// Add error handling for static files
app.use('product/overview/content/mybnd', (err, req, res, next) => {
    if (err) {
      console.error('Static file error:', err);
      res.status(404).json({ error: 'File not found' });
    }
    next();
  });


// Middleware for JWT validation
const validateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization header missing or invalid');
        return res.status(401).json({ error: 'Authorization header missing or invalid', authHeader });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
        req.clientIdFromToken = decoded.sub; // Extract clientId from the 'sub' claim
        next();
    } catch (error) {
        console.error('JWT validation failed:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Route to serve the static HTML with clientId validation
app.get('/product/overview/:clientid', validateJWT, (req, res) => {
    const { clientid } = req.params;

    console.log('ClientId from URL:', clientid);

    // Validate clientId from the JWT
    if (req.clientIdFromToken !== clientid) {
        return res.status(403).json({ error: 'Not authorized to access this clientId' });
    }

    // Serve the static HTML file
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start the server
app.listen(PORT, () => {
    const exampleJWT = jwt.sign({ sub: '12345' }, 'your-secret-key', { expiresIn: '1h' }); // Replace 'your-secret-key' with your actual secret key
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Example requests:');
    console.log(`curl -X GET http://localhost:${PORT}/product/overview/12345 -H "Authorization: Bearer ${exampleJWT}"`);
});