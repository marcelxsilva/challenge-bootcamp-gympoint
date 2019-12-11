import Checkin from '../models/Checkin';
import Users from '../models/Users';
import { subDays } from 'date-fns';
import { Op } from 'sequelize';
class CheckinController {
  async store(req, res) {

    const user = await Users.findOne({ where: { id: req.body.student_id } });
    if (!user) { return res.status(400).json({ error: 'user not exists' }) }

    const amountCheckinsInAcademy = await Checkin.findAndCountAll(
      {
        where: {
          [Op.or]: [{
            created_at: {
              [Op.between]: [subDays(new Date(), 7), new Date()]
            }
          }]
        }
      }

    )
    if (amountCheckinsInAcademy.count === 5) {
      return res.status(401).json({ error: 'user not authorized' })
    }
    const { student_id, id } = await Checkin.create(req.body)
    return res.json({ response: { id_checkin: id, student_id, message: 'created with success' } });
  }

  async index(req, res) {
    const { student_id } = req.body;
    if (student_id) {
      const response = await Checkin.findAll({ where: { student_id } })
      return res.json(response);
    } else {
      const response = await Checkin.findAll()
      return res.json(response);
    }
  }
}

export default new CheckinController();