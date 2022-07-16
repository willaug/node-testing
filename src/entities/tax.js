class Tax {
  taxesBasedOnAge(age) {
    const params = [
      { from: 18, to: 25, tax: 2.5 },
      { from: 26, to: 34, tax: 1.8 },
      { from: 35, to: 66, tax: 0 },
      { from: 67, to: 70, tax: 1.9 },
      { from: 71, to: 120, tax: 2.8 },
    ];

    return params.find((param) => Number(age) >= param.from && Number(age) <= param.to);
  }
}

module.exports = Tax;
