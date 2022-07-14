const Base = require('./base');

class Car extends Base {
  constructor({
    id,
    name,
    createdAt,
    categoryId,
    available,
    releaseYear,
    gasAvailable,
  }) {
    super({ id, name, createdAt });
    this.gasAvailable = gasAvailable;
    this.releaseYear = releaseYear;
    this.categoryId = categoryId;
    this.available = available;
  }
}

module.exports = Car;
