const { tryCatchWrapper, endPointResponse } = require("../helpers");
const authServices = require("../services/auth.services");

const registerUser = tryCatchWrapper(async (req, res, next) => {
  const { firstName, lastName, email, phone, profileImage, password } =
    req.body;
  const response = await authServices.createUser(
    firstName,
    lastName,
    email,
    phone,
    profileImage,
    password
  );
  // Se devuelve la respuesta de la peticion http usando la funcion "endPointResponse"
  endPointResponse({
    res,
    code: 201,
    message: "Nuevo usuario registrado",
    body: response,
  });
});

const loginUser = tryCatchWrapper( async (req, res, next) => {
  const { email, password } = req.body;
  const response = await authServices.login(email, password);

  endPointResponse({
    res,
    code: 200,
    message: "Login exitoso",
    body: response,
  });
});

module.exports = { registerUser, loginUser };
