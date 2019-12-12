import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {

  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_entry: Sequelize.VIRTUAL,
      password: Sequelize.STRING,
      level: Sequelize.INTEGER,
      active: Sequelize.BOOLEAN
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if (user.password_entry) {
        user.password = await bcrypt.hash(user.password_entry, 7);
      }
    });
    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  static associate(models) {
    this.belongsTo(models.AcademyPlan, { foreignKey: 'plan_id', as: 'plan' });
  }
}
export default User;