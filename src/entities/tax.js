class Tax {
  taxesBasedOnAge(age) {
    const params = [
      { from: 18, to: 25, tax: 14 },
      { from: 26, to: 34, tax: 6 },
      { from: 35, to: 66, tax: 0 },
      { from: 67, to: 70, tax: 7 },
      { from: 71, to: 120, tax: 18 },
    ];

    return params.find((param) => Number(age) >= param.from && Number(age) <= param.to);
  }
}

module.exports = Tax;
