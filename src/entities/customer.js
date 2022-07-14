const Base = require('./base');

class Customer extends Base {
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
