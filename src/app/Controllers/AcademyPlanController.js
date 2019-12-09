import AcademyPlan from '../models/AcademyPlan';
import * as yup from 'yup';

class AcademyPlanController {
  async index(req, res) {
    const { id_plan } = req.body;
    const plan = await AcademyPlan.findByPk(id_plan);
    if (!plan) {
      const findAll = await AcademyPlan.findAll();
      return res.json({ plan: findAll })
    }
    return res.json({ plan });
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

    const planExists = await AcademyPlan.findOne({ where: { title: req.body.title } });
    if (planExists) { return res.status(400).json({ error: 'is plan has exists' }) };

    const plan = await AcademyPlan.create(req.body);
    return res.json(plan)
  }

  async update(req, res) {
    const schema = yup.object().shape({
      title: yup.string(),
      duration: yup.string(),
      price: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }
    const plan = await AcademyPlan.findByPk(req.params.id);
    if (!plan) { return res.status(400).json({ error: 'error in update plan id empty' }) }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      plan: {
        title,
        duration,
        price
      }
    })

  }
  async delete(req, res) {
    const plan = await AcademyPlan.findByPk(req.params.id);
    if (!plan) { return res.status(400).json({ error: 'plan not exists' }) }

    const deletedPlan = await AcademyPlan.destroy({ where: { id: req.params.id } });
    return deletedPlan && res.status(200).json({ message: 'deleted with success' })
  }
}
export default new AcademyPlanController();