const cluster = require('node:cluster');
const os = require('os')
const express = require('express');

const totalCPUs = os.cpus().length;

// console.log(`Total CPUs: ${totalCPUs}`);


if(cluster.isPrimary) {
  for(let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
}else{
  const app = express();
  const port = 8000;
  app.get('/', (req, res) => {
    return res.json({message: `Hello From Express Server! ${process.pid}`});
  });
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}


























