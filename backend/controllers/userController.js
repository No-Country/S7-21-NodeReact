const { User } = require('../database/models');
const { tryCatchWrapper } = require("../helpers");

const showMe = tryCatchWrapper( async (req, res, next) => {
    const user = await User.findOne({
        where: { id: req.user.payload.payload },
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
  });

module.exports = { showMe };