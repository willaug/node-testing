const Entity = require('../base/entity');

class Customer extends Entity {
  constructor({
    id,
    age,
    name,
    createdAt,
  }) {
    super({ id, name, createdAt });
    this.age = age;
  }
}

module.exports = Customer;
