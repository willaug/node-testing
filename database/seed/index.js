const { join } = require('path');
const { existsSync, mkdirSync, rmSync } = require('fs');
const { writeFile } = require('fs/promises');

const carCategory = require('./01-carCategories');
const cars = require('./02-cars')(carCategory.id, 2);
const customers = require('./03-customers')(2);

const seederBaseFolder = join(__dirname, '../', 'db');

const write = (filename, data) => {
  const jsonData = JSON.stringify(data, null, 2);
  const path = join(seederBaseFolder, filename);
  console.log(jsonData);

  return writeFile(path, jsonData);
};

(async () => {
  if (existsSync(seederBaseFolder)) {
    rmSync(seederBaseFolder, { recursive: true });
  }

  mkdirSync(seederBaseFolder, { recursive: true });

  await write('cars.json', cars);
  await write('customers.json', customers);
  await write('car-categories.json', [carCategory]);

  console.log('Done!');
})();
