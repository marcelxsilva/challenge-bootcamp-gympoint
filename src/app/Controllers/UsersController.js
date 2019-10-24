import Users from '../models/Users';
import * as yup from 'yup';


class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password_entry: yup.string().required().min(6),
      level: yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }
    const userExists = await Users.findOne({ where: { email: req.body.email } });
    if (userExists) { return res.status(400).json({ error: 'users already exists' }); }
    const { id, name, email, provider } = await Users.create(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
        provider
      }
    });
  }
}
export default new UserController();