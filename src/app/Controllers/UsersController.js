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
    const { id, name, email, level } = await Users.create(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
        level
      }
    });
  }

  async create(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      age: yup.number(),
      burden: yup.string(),
      height: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }
    const userExists = await Users.findOne({ where: { email: req.body.email } });
    if (userExists) { return res.status(400).json({ error: 'users already exists' }); }

    const { id, name, email } = await Users.create({ ...req.body, level: 2 });
    return res.json({
      user: {
        id,
        name,
        email,
      }
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string(),
      oldPassword: yup.string(),
      password_entry: yup.string().when('oldPassword', (password_entry, field) => {
        password_entry ? field.required() : field;
      })
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails in password' })
    }
    const { email, oldPassword } = req.body;
    const user = await Users.findOne({ where: { email } });

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, age, height, burden } = await user.update(req.body);
    return res.json({ id, name, email, age, height, burden });
  }
  async index(req, res) {
    const { id } = req.body;
    if (id) {
      const response = await Users.findByPk(id);
      return res.json({ response })
    } else {
      const response = await Users.findAll();
      return res.json({ response })
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const response = await Users.findOne({ where: { id } });
    response.destroy()
    return response && res.json({ response: 'deleted with success' })
  }
}
export default new UserController();