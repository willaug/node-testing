const Database = require('../base/database');
const Tax = require('../entities/tax');

class CarService {
  constructor({ cars }) {
    this.cars = new Database({ file: cars });
  }

  async findOneByCategory(categoryId) {
    return this.cars.findOne({
      columnName: 'categoryId',
      columnValue: categoryId,
    });
  }

  async findRandomAvailable() {
    return this.cars.findOne({
      columnName: 'available',
      columnValue: true,
    });
  }

  async findByCategory(categoryId) {
    return this.cars.find({
      columnName: 'categoryId',
      columnValue: categoryId,
    });
  }

  rent({ customer, carCategory, numberOfDays }) {
    const { age } = customer;
    const { price } = carCategory;
    const { tax } = new Tax().taxesBasedOnAge(age);

    const subtotal = Number(price) * numberOfDays;
    const calculatedTax = (subtotal * tax) / 100;
    const total = calculatedTax + subtotal;

    const formattedTotal = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);

    return {
      total,
      subtotal,
      calculatedTax,
      formattedTotal,
    };
  }
}

module.exports = CarService;
