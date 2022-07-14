const { faker } = require('@faker-js/faker');
const CarCategory = require('../../src/entities/car-category');

module.exports = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  createdAt: faker.date.recent(),
  price: faker.finance.amount(250, 820),
});
