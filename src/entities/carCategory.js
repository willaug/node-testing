const Entity = require('../base/entity');

class CarCategory extends Entity {
  constructor({
    id,
    name,
    price,
    createdAt,
  }) {
    super({ id, name, createdAt });
    this.price = price;
  }
}

module.exports = CarCategory;
