import jwt from 'jsonwebtoken';
import User from '../models/Users';
import authConfig from '../../config/auth';
import * as yup from 'yup';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) { res.status(401).json({ error: 'user not found' }) }

    if (!await user.checkPassword(password)) {
      return res.status(401).json({ error: 'password does not match' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: '7m' })
    })
  }
}

export default new SessionController();