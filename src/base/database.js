const { readFile } = require('fs/promises');

class Database {
  constructor({ file }) {
    this.file = file;
  }

  async findAll() {
    const data = await readFile(this.file);
    return JSON.parse(data);
  }

  async find({ columnName, columnValue }) {
    const data = await this.findAll();
    return data.filter((row) => row[columnName] === columnValue);
  }

  async findOne({ columnName, columnValue }) {
    const data = await this.findAll();
    return data.find((row) => row[columnName] === columnValue);
  }
}

module.exports = Database;
