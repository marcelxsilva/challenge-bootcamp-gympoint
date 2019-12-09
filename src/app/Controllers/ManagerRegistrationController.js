import ManagerRegistrationModel from '../models/ManagerRegistration';
import AcademyPlan from '../models/AcademyPlan';
import { addMonths, parseISO } from 'date-fns';
import * as yup from 'yup';

class ManagerRegistration {

  async store(req, res) {
    const schema = yup.object().shape({
      student_id: yup.number().required(),
      plan_id: yup.number().required(),
      start_date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }

    const { duration, price } = AcademyPlan.findOne({ where: { id: req.body.plan_id } });

    const response = await ManagerRegistrationModel.create({
      ...req.body,
      end_date: addMonths(parseISO(req.body.start_date), duration),
      price: duration * price,
    })

    return res.json(response);
  }

  async index(req, res) {
    const response = await ManagerRegistrationModel.findAll({ id: 1 })
    return res.json(response)
  }
}
export default new ManagerRegistration();