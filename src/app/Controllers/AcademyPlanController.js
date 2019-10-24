import AcademyPlan from '../models/AcademyPlan';
import { or, } from 'sequelize'
import * as yup from 'yup';

class AcademyPlanController {
  async index(req, res) {
    const { id_plan } = req.body;
    const plan = await AcademyPlan.findAll({ where: { id: id_plan, [or]: { id: !id_plan } } });
    return req.json(plan)
  }

  
  async store(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup.string().required(),
      price: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const plan = await AcademyPlan.create(req.body);
    return res.json(plan)
  }
  async update(req, res) { }
  async delete(req, res) { }
}
export default new AcademyPlanController();