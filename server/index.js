const path = require('path');
const express = require('express');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'client/dist');

const app = express();

app.use(express.json());
app.use(express.static(DIST_DIR));




app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});