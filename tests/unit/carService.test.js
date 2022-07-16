const { expect } = require('chai');
const { join } = require('path');
const { createSandbox } = require('sinon');
const {
  it,
  describe,
  afterEach,
  beforeEach,
} = require('mocha');

const CarService = require('../../src/services/carService');

const mocks = {
  cars: require('../mocks/cars.json'),
  customer: require('../mocks/customer.json'),
  carCategory: require('../mocks/carCategory.json'),
};

describe('CarService Suite Tests', () => {
  let carService = {};
  let sandbox;

  beforeEach(() => {
    const cars = join(__dirname, '../mocks/cars.json');
    carService = new CarService({ cars });
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
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
      total: 4183.8,
      subtotal: 3670,
      calculatedTax: 513.8,
      formattedTax: '$513.80',
      formattedTotal: '$4,183.80',
    };

    const calc = carService.calcTotal({
      customer,
      carCategory,
      numberOfDays,
    });

    expect(calc).to.deep.eq(expected);
  });

  it('Given a customer and a car category it should return a transaction receipt', async () => {
    const { cars, customer, carCategory } = mocks;
    const numberOfDays = 5;
    const expected = {
      customer: customer.name,
      car: cars[0].name,
      dueDate: 'July 20, 2022',
      category: carCategory.name,
      tax: '$513.80',
      total: '$4,183.80',
    };

    const testDate = new Date(2022, 6, 15);
    sandbox.useFakeTimers(testDate.getTime());

    const response = await carService.rent({
      customer,
      carCategory,
      numberOfDays,
    });

    expect(response).to.deep.eq(expected);
  });
});
