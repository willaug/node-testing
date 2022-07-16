const { faker } = require('@faker-js/faker');
const Customer = require('../../src/entities/customer');

const customer = () => new Customer({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  createdAt: faker.date.recent(),
  age: faker.datatype.number({ min: 18, max: 72 }),
});

module.exports = (amount) => {
  const customers = [];

  for (let index = 0; index <= amount; index += 1) {
    const createdCustomer = customer();
    customers.push(createdCustomer);
  }

  return customers;
};
