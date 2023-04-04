const {
  tryCatchWrapper,
  endPointResponse,
  CustomError,
} = require("../helpers");
const userServices = require("../services/users.services");
const { User } = require("../database/models");

const getAllUsers = tryCatchWrapper(async (req, res, next) => {
  const { roleUser } = req.params;
  const allUsers = await userServices.findAllUsers(roleUser);

  endPointResponse({
    res,
    message: `Usuarios con el rol "${roleUser}" listados de manera exitosa`,
    body: allUsers,
  });
});

const showMe = tryCatchWrapper(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new CustomError("usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    code: 200,
    message: "informacion del usuario",
    body: user,
  });
});

const getUserById = tryCatchWrapper(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId);

  if (!user) {
    throw new CustomError("Usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    code: 200,
    message: "Usuario encontrado",
    body: user,
  });
});

// no actualiza el usuario debemos arreglarla
const updateUserById = tryCatchWrapper(async (req, res, next) => {
  const userId = req.params.id;

  const [rowsUpdated] = await User.update({
    where: { id: userId },
    returning: true,
  });

  if (rowsUpdated === 0) {
    throw new CustomError("Usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    code: 200,
    message: "Usuario encontrado",
    body: updateDate,
  });
});

const deleteUser = tryCatchWrapper(async (req, res, next) => {
  const userId = req.params.id;

  const rowsDeleted = await User.destroy({
    where: { id: userId },
  });

  if (rowsDeleted === 0) {
    throw new CustomError("Usuario no encontrado", 404);
  }

  endPointResponse({
    res,
    message: `Usuario ${userId} eliminado`,
  });
});

module.exports = {
  getAllUsers,
  showMe,
  getUserById,
  updateUserById,
  deleteUser,
};
