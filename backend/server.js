const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Ikonex Academy Systems Core API Execution Matrix Online.');
});

// Serve index.html for all other routes (SPA fallback) - MUST BE LAST
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server actively running on interface port target: ${PORT}`);
});