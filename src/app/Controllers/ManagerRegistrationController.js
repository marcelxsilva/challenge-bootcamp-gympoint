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
    const { duration, price } = await AcademyPlan.findOne({ where: { id: req.body.plan_id } })
    const date_end_formatted = addMonths(parseISO(req.body.start_date), +duration)
    const priceFormatted = price * duration;

    const response = await ManagerRegistrationModel.create({
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date: parseISO(req.body.start_date),
      end_date: date_end_formatted,
      price: priceFormatted,
    })
    return res.send({ response })
  }

  async index(req, res) {
    const { student_id } = req.body;
    if (student_id) {
      const response = await ManagerRegistrationModel.findOne({ where: { student_id } })
      return res.json({response})
    } else {
      const response = await ManagerRegistrationModel.findAll()
      return res.json({response})
    }
  }

  async update(req, res) {
    const schema = yup.object().shape({
      student_id: yup.number().required(),
      plan_id: yup.number().required(),
      start_date: yup.date().required(),
      end_date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }

    const { duration, price } = await AcademyPlan.findOne({ where: { id: req.body.plan_id } });
    const dateFormatted = addMonths(parseISO(req.body.start_date), duration);
    const priceFormatted = duration * price;

    const registration = await ManagerRegistrationModel.findOne({ where: { student_id: req.body.student_id } });
    registration.update({
      ...req.body,
      end_date: dateFormatted,
      price: priceFormatted
    })
    return res.json({ response: registration })
  }

  async delete(req, res) {
    try {
      const { student_id } = req.body;
      const response = await ManagerRegistrationModel.destroy({ where: { student_id } })
      if (response) {
        return res.json({ response: 'success' })
      }
    } catch (error) {

    }
  }
}
export default new ManagerRegistration();