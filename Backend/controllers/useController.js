const userService = require("../services/useService");

const getUsers = (req, res) => {
  const users = userService.getUsers();
  res.json(users);
};

module.exports = {
  getUsers,
};
