import HelpOrders from '../models/HelpOrders';
import * as yup from 'yup';


class HelpOrdersController {
  async store(req, res) {
    const schema = yup.object().shape({
      question: yup.string().required(),
    });
    const { student_id } = req.params;
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }
    const response = await HelpOrders.create({ ...req.body, student_id });
    return res.json(response);
  }

  async index(req, res) {
    const { student_id } = req.body;
    if (student_id) {
      const response = await HelpOrders.findAll({ where: { student_id } });
      return res.json(response)
    } else {
      const response = await HelpOrders.findAll({ where: { answer: null } });
      return res.json(response)
    }
  }
  async update(req, res) {
    const { id_help_order, answer } = req.body;
    const help = await HelpOrders.findOne({ where: { id: id_help_order } })
    if (!help) { return res.json({ error: 'Help order not found' }) };

    help.update({ answer, answer_at: new Date() });
    return res.json({ response: 'updated with success' })
  }
}
export default new HelpOrdersController();