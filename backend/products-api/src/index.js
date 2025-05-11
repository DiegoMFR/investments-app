// This file is the entry point of the application. It initializes the Node.js application and can include routes, middleware, and other configurations.

const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Load the data from db.json
const dataFilePath = 'db.json';
let products = [];

try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    products = JSON.parse(rawData);
} catch (error) {
    console.error('Error reading or parsing db.json:', error);
}

// Middleware for JWT validation
const validateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
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

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Products API');
});

// Endpoint to get products by clientId with JWT validation
app.get('/api/v1/products/:clientId/:iban?', validateJWT, (req, res) => {
    const { clientId } = req.params;
    const { iban } = req.params;

    let clientProducts = products.filter(product => product.clientId === clientId);

    if (iban != undefined) {
        clientProducts = clientProducts.filter(product => product.iban === iban);
    }

    if (clientProducts.length == 0) {
        return res.status(404).json({ error: 'No products found for the given clientId' });
    } else if (req.clientIdFromToken !== clientId) {
        return res.status(403).json({ error: 'Not authorized to access this clientId' });
    }

    return res.json(clientProducts);
});

// Endpoint to serve a fake token
app.post('/oauth2/token', (req, res) => {
    const { clientId } = req.body;

    if (!clientId) {
        return res.status(400).json({ error: 'clientId is required' });
    }

    const token = jwt.sign({ sub: clientId }, 'your-secret-key', { expiresIn: '1h' }); // Replace 'your-secret-key' with your actual secret key
    res.json({ access_token: token, token_type: 'Bearer', expires_in: 3600 });
});

// Start the server
app.listen(PORT, () => {
    const exampleJWT = jwt.sign({ sub: '12345' }, 'your-secret-key', { expiresIn: '1h' }); // Replace 'your-secret-key' with your actual secret key
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Example requests:');
    console.log(`curl -X POST http://localhost:${PORT}/oauth2/token -H "Content-Type: application/json" -d '{"clientId": "12345"}'`);
    console.log(`curl -X GET http://localhost:${PORT}/api/v1/products/12345 -H "Authorization: Bearer ${exampleJWT}"`);
});