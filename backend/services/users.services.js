const { User } = require("../database/models");
const { CustomError } = require("../helpers");

const findAllUsers = async (roleUser) => {
  try {
    const users = await User.findAndCountAll({
      where: { role: roleUser },
      attributes: { exclude: ["password"] },
    });

    return users;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { findAllUsers };
