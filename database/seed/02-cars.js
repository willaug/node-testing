const { faker } = require('@faker-js/faker');
const Car = require('../../src/entities/car');

const car = (categoryId) => new Car({
  id: faker.datatype.uuid(),
  name: faker.vehicle.model(),
  createdAt: faker.date.recent(),
  available: true,
  categoryId,
  gasAvailable: true,
  releaseYear: faker.date.past().getFullYear(),
});

module.exports = (categoryId, amount) => {
  const cars = [];

  for (let index = 0; index <= amount; index += 1) {
    const createdCar = car(categoryId);
    cars.push(createdCar);
  }

  return cars;
};
