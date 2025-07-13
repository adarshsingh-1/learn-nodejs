const express = require('express');

const app = express();
const port = 8000;


app.get('/', (req, res) => {
  return res.json({message: `Hello From Express Server! ${process.pid}`});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
