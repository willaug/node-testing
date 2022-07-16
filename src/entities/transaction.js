class Transaction {
  generateTransactionReceipt({
    car,
    customer,
    carCategory,
    finalPrice,
    formattedDueDate,
  }) {
    return {
      car: car.name,
      customer: customer.name,
      dueDate: formattedDueDate,
      category: carCategory.name,
      tax: finalPrice.formattedTax,
      total: finalPrice.formattedTotal,
    };
  }
}

module.exports = Transaction;
