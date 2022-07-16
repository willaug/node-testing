const Entity = require('../base/entity');

class Car extends Entity {
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
