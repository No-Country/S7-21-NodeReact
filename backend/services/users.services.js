const { User } = require("../database/models");
const { CustomError, checkPermissions, createJwt } = require("../helpers");

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

const updateUser = async (id, newInfo, reqUser) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new CustomError("Usuario no encontrado", 404);
    }

    checkPermissions(reqUser, user.id);

    const { firstName, lastName, email, phone, profileImage } = newInfo;
    let emailInUse, phoneInUse;

    if (email) {
      emailInUse = await User.findOne({
        where: { email },
      });
    }
    if (phone) {
      phoneInUse = await User.findOne({
        where: { phone },
      });
    }
    if (emailInUse || phoneInUse) {
      throw new CustomError(
        `Este ${emailInUse ? "email" : "telefono"} ya se encuentra registrado`,
        400
      );
    }

    await user.update({
      firstName,
      lastName,
      email,
      phone,
      profileImage,
      attributes: { exclude: ["password"] },
    });
    await user.save();
    const payload = { id: user.id, role: user.role };
    const newToken = createJwt({ payload });

    return newToken;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { findAllUsers, updateUser };
