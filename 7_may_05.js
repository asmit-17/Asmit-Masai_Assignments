const express = require('express');
const os = require('os');
const dns = require('dns').promises;
const { readFileContent } = require('./read');
const app = express();
const port = 3000;

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/readfile', (req, res) => {
  const fileContent = readFileContent();
  res.send(fileContent);
});

app.get('/systemdetails', (req, res) => {
  const totalMemoryGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
  const freeMemoryGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
  const cpuModel = os.cpus()[0].model;
  const cpuCores = os.cpus().length;

  const systemDetails = {
    platform: os.platform(),
    totalMemory: `${totalMemoryGB} GB`,
    freeMemory: `${freeMemoryGB} GB`,
    cpuModel: cpuModel,
    cpuCores: cpuCores,
  };
  res.json(systemDetails);
});

app.get('/getip', async (req, res) => {
  try {
    const addresses = await dns.resolve('masaischool.com', 'A');
    const ipv6Addresses = await dns.resolve('masaischool.com', 'AAAA');

    res.json({
      hostname: 'masaischool.com',
      ipv4Addresses: addresses,
      ipv6Addresses: ipv6Addresses
    });
  } catch (error) {
    console.error(`Error resolving DNS: ${error.message}`);
    res.status(500).json({ error: 'Failed to resolve DNS', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});