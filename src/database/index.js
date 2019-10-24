import sequelize from 'sequelize';
import databaseConfig from '../config/database';

// models
import Users from '../app/models/Users';
const models = [Users];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();