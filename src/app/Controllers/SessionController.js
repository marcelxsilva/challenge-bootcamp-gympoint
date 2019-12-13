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

    if (user.status === false) { return res.status(401).json({ error: 'user not autorized' }); }


    if (!await user.checkPassword(password)) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, status, level, active } = user;
    return res.json({
      user: {
        id,
        name,
        email,
        status,
        level,
        active
      },
      token: jwt.sign({ id }, authConfig.secret, { expiresIn: '7d' })
    })
  }
}

export default new SessionController();