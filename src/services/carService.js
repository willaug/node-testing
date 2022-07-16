const Database = require('../base/database');

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
}

module.exports = CarService;
