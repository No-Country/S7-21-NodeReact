const { User } = require("../database/models");
const {
  CustomError,
  encryptPassword,
  createJwt,
  comparePassword,
} = require("../helpers");

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
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await createJwt({ payload });

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

const reset = async (email, oldPassword, newPassword, confirmNewPassword) => {
  try {
    // Verificar que las contraseñas nuevas sean iguales
    if (newPassword !== confirmNewPassword) {
      throw new CustomError("Las contraseñas no coinciden", 400);
    }

    // Verificar que la contraseña anterior sea correcta
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(oldPassword, user.password))) {
      throw new CustomError("Las contraseñas anterior no es correcta", 400);
    }

    //Encriptar la nueva contraseña
    const hashPassword = await encryptPassword(newPassword);

    // Actualizar la contraseña
    await user.update({ password: hashPassword });

    return "La contraseña ha sido actualizada.";
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createUser, login, reset };
