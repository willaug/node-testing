const Transaction = require('../entities/transaction');
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

  calcTotal({ customer, carCategory, numberOfDays }) {
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

    const formattedTax = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(calculatedTax);

    return {
      total,
      subtotal,
      calculatedTax,
      formattedTax,
      formattedTotal,
    };
  }

  async rent({ customer, carCategory, numberOfDays }) {
    const car = await this.findOneByCategory(carCategory.id);
    const finalPrice = this.calcTotal({ customer, carCategory, numberOfDays });

    const today = new Date();
    const dueDate = today.setDate(today.getDate() + numberOfDays);
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDueDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(dueDate);

    return new Transaction().generateTransactionReceipt({
      car,
      customer,
      finalPrice,
      carCategory,
      formattedDueDate,
    });
  }
}

module.exports = CarService;
