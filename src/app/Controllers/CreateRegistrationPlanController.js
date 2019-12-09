import Users from '../models/Users';
import AcademyPlan from '../models/AcademyPlan';

class CreateRegistratioPlanController {
  async store(req, res) {
    const { id_user, id_plan } = req.body;

    const userExists = await Users.findByPk(id_user);
    if (!userExists) { return res.status(400).json({ error: 'user not exists' }) }

    const planExists = await AcademyPlan.findByPk(id_plan);
    if (!planExists) { return res.status(400).json({ error: 'plan not exists' }) }

    const { name, email, id, plan_id } = await userExists.update({ plan_id: id_plan });
    return res.json({ name, email, id, plan_id });
  }

  async update(req, res) {
    const { id_user, id_plan, status_users} = req.body;

    const user = await Users.findByPk(id_user);
    if (!user) { return res.status(400).json({ error: 'user not exists' }) }

    const planExists = await AcademyPlan.findByPk(id_plan);
    if (!planExists) { return res.status(400).json({ error: 'plan not exists' }) }

    const { name, email, id, plan_id, status } = await user.update({ plan_id: id_plan === 0 ? null : id_plan, status: status_users })
    return res.json({ name, email, id, plan_id,status });
  }
}

export default new CreateRegistratioPlanController();