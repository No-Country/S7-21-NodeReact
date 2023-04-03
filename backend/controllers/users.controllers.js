const { tryCatchWrapper, endPointResponse } = require("../helpers");
const userServices = require("../services/users.services");


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

module.exports = { getAllUsers, showMe };
