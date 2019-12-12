import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter} from 'date-fns'
class ManagerRegistration extends Model {

  static init(sequelize) {
    super.init({
      student_id: Sequelize.INTEGER,
      plan_id: Sequelize.INTEGER,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
      price: Sequelize.STRING,
      active: {
        type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
          'start_date',
          'end_date',
        ]),
        get() {
          return (
            isBefore(this.get('start_date'), new Date()) &&
            isAfter(this.get('end_date'), new Date())
          );
        },
      },
    }, { sequelize })

    return this;
  }
}
export default ManagerRegistration;

