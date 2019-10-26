import User from '../models/Users';

export default async (req, res, next) => {
  try {
    const { userId } = req;
    const userIsAdmin = await User.findOne({ where: { id: userId, level: 1 } });
    if (!userIsAdmin) { return res.status(400).json({ error: 'user not is admin' }) }
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }
}