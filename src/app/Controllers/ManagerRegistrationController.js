import ManagerRegistrationModel from '../models/ManagerRegistration';
import AcademyPlan from '../models/AcademyPlan';
import Users from '../models/Users';
import AcademyPlan from '../models/AcademyPlan';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as yup from 'yup';
import Mail from '../../lib/Mail';

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
    const { duration, price, title } = await AcademyPlan.findOne({ where: { id: req.body.plan_id } })
    const date_end_formatted = addMonths(parseISO(req.body.start_date), +duration)
    const priceFormatted = price * duration;

    const user = await Users.findOne({ where: { id: req.body.student_id, active: true } });
    if (!user) { return res.status(401).json({ response: 'user not authorized' }) }
    user.update({ plan_id: req.body.plan_id });

    const response = await ManagerRegistrationModel.create({
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date: parseISO(req.body.start_date),
      end_date: date_end_formatted,
      price: priceFormatted,
    });

    if (response) {
      await Mail.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'Matricula Cadastrada',
        template: 'registrationCreate',
        context: {
          title,
          name: user.name,
          end: format(date_end_formatted,
            "'dia' dd 'de' MMMM', as ' H:mm:h",
            { locale: pt }
          ),
          price: priceFormatted,
        }
      })
    }
    return res.send({ response })
  }

  async index(req, res) {
    const { student_id } = req.body;
    if (student_id) {
      const response = await ManagerRegistrationModel.findOne({
        attributes: ['id', 'start_date', 'end_date', 'price', 'active', 'plan_id'],
        include: [{
          model: Users,
          as: 'users',
          attributes: ['id', 'name'],
          include: [{
            model: AcademyPlan,
            as: 'plan',
            attributes: ['title'],
          }],
        }],
      })
      return res.json({ response })
    } else {
      const response = await ManagerRegistrationModel.findAll({
        attributes: ['id', 'start_date', 'end_date', 'price', 'active', 'plan_id'],
        include: [{
          model: Users,
          as: 'users',
          attributes: ['id', 'name'],
          include: [{
            model: AcademyPlan,
            as: 'plan',
            attributes: ['title'],
          }],
        }],
      })
      return res.json({ response })

    }
  }

  async update(req, res) {
    const schema = yup.object().shape({
      student_id: yup.string().required(),
      plan_id: yup.string().required(),
      start_date: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }
    const user = await Users.findOne({ where: { id: req.body.student_id } });
    user.update({ plan_id: req.body.plan_id })
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
      const { id } = req.params;
      const response = await ManagerRegistrationModel.destroy({ where: { id } })
      if (response) {
        return res.json({ response: 'success' })
      }
    } catch (error) {

    }
  }
}
export default new ManagerRegistration();