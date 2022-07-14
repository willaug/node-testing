const { join } = require('path');
const { existsSync, mkdirSync, rmSync } = require('fs');
const { writeFile } = require('fs/promises');
const carCategory = require('./01-car-categories');
const cars = require('./02-cars')(carCategory.id, 2);

const seederBaseFolder = join(__dirname, '../', 'db');

const write = (filename, data) => {
  const jsonData = JSON.stringify(data, null, 2);
  const path = join(seederBaseFolder, filename);

  return writeFile(path, jsonData);
};

(async () => {
  if (existsSync(seederBaseFolder)) {
    rmSync(seederBaseFolder, { recursive: true });
  }

  mkdirSync(seederBaseFolder, { recursive: true });

  await write('cars.json', cars);
  await write('car-categories.json', [carCategory]);

  console.log('Done!');
})();
