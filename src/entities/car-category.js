const Base = require('./base');

class CarCategory extends Base {
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
