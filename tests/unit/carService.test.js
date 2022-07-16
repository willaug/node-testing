const { expect } = require('chai');
const { join } = require('path');
const { it, describe, beforeEach } = require('mocha');

const CarService = require('../../src/services/carService');

const mocks = {
  cars: require('../mocks/cars.json'),
  customer: require('../mocks/customer.json'),
  carCategory: require('../mocks/carCategory.json'),
};

describe('CarService Suite Tests', () => {
  let carService = {};

  beforeEach(() => {
    const cars = join(__dirname, '../mocks/cars.json');
    carService = new CarService({ cars });
  });

  it('Should choose a random car by category', async () => {
    const { id: carCategoryId } = mocks.carCategory;

    const randomCar = await carService.findOneByCategory(carCategoryId);

    expect(randomCar).to.be.an('object');
    expect(mocks.cars).to.deep.include(randomCar);
  });

  it('Should choose a random available car', async () => {
    const availableCar = await carService.findRandomAvailable();

    expect(availableCar).to.be.an('object');
    expect(mocks.cars).to.deep.include(availableCar);
  });

  it('Should get cars by category', async () => {
    const { id: carCategoryId } = mocks.carCategory;

    const searchedCars = await carService.findByCategory(carCategoryId);

    expect(searchedCars).to.be.an('array');
    expect(mocks.cars).to.deep.eq(searchedCars);
  });

  it('Given a category, customer and days it should calc the final amount', () => {
    const { customer, carCategory } = mocks;
    const numberOfDays = 5;
    const expected = {
      total: 3761.75,
      subtotal: 3670,
      calculatedTax: 91.75,
      formattedTotal: '$3,761.75',
    };

    const rent = carService.rent({
      customer,
      carCategory,
      numberOfDays,
    });

    expect(rent).to.deep.eq(expected);
  });
});
