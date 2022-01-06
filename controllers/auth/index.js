import { HttpCode } from "../../lib/constants";
import AuthService from "../../service/auth";

const authService = new AuthService();

const registratoin = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }

  const data = await authService.create(req.body);

  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    user: data,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  const { subscription } = user;
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { token, user: { email, subscription } },
  });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json({
    status: "success",
    code: HttpCode.NO_CONTENT,
    data: {},
  });
};

const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { email, subscription },
  });
};

const updateSubscription = async (req, res, next) => {
  const { email, id } = req.user;
  const { subscription } = req.body;
  await authService.setSubscription(id, subscription);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { email, subscription },
  });
};

export { registratoin, login, logout, currentUser, updateSubscription };
