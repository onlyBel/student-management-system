const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Ikonex Academy Systems Core API Execution Matrix Online.');
});

app.listen(PORT, () => {
  console.log(`Server actively running on interface port target: ${PORT}`);
});