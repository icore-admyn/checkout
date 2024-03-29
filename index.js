const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors());

// Redirect HTTP to HTTPS
const sslPrivKeyPath = process.env.SSL_PRIVATE_KEY_PATH;
const sslFullChainPath = process.env.SSL_FULL_CHAIN_PATH;

// API Routes
app.use('/api', apiRoutes);

// Serve React App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Check if SSL configuration is provided
if (sslPrivKeyPath && sslFullChainPath) {
  // Use HTTPS if SSL configuration is provided
  const httpsOptions = {
    key: fs.readFileSync(sslPrivKeyPath),
    cert: fs.readFileSync(sslFullChainPath),
  };

  // Start the server with HTTPS
  require('https').createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT} with HTTPS`);
  });

} else {
  // Start the server with HTTP
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} with HTTP`);
  });
}
