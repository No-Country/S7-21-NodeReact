const { User } = require("../database/models");
const { CustomError, encryptPassword, createJwt, comparePassword } = require("../helpers");

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

const login = async (email, password) => {
  try {
    // Busca en la base de datos si existe un registro con este email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError("Credenciales inválidas", 401);
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new CustomError("Credenciales inválidas", 401);
    }

    // Genera un token de acceso para el usuario autenticado
    const pld = {
      payload: user.id
    }
    const token = await createJwt(pld);

    // Devuelve los detalles del usuario autenticado y el token de acceso
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
      },
      token,
    };
  } catch (error) {
    // Si ocurre un error lo devuelve al usuario a través de la clase CustomError
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createUser, login };
