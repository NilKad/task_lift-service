const fs = require('fs/promises');
const path = require('path');
const fileName = 'status.json';

const liftStatus = path.join(__dirname, fileName);

const getStatus = async () => {
  const data = await fs.readFile(liftStatus);
  return JSON.parse(data);
};

const writeStatus = async data => {
  await fs.writeFile(liftStatus, JSON.stringify(data, null, 2));
  return data;
};

module.exports = { writeStatus, getStatus };
