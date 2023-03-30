const { User } = require("../database/models");
const { CustomError, encryptPassword } = require("../helpers");

const createUser = async (
  firstName,
  lastName,
  email,
  phone,
  profileImage,
  password
) => {
  try {
    // Se encripta la contraseña ingresada por el usuario
    const hashPassword = await encryptPassword(password);
    // Busca en la base de datos si ya existe un registro con este email,
    // sino existe crea un nuevo registro, de lo contrario devuelve "false"
    // en la variable "created"
    const [_, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        phone,
        profileImage,
        password: hashPassword,
      },
    });
    if (!created) {
      throw new CustomError("Este email ya esta registrado", 400);
    }

    return "Usuario registrado de manera exitosa";
  } catch (error) {
    // Si ocurre un error lo devuelve al usuario a traves de la clase CustomError
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createUser };
