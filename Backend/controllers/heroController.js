const heroService = require("../services/heroServices");

const getHeroData = (req, res) => {
  res.json(heroService.getHeroData());
};

module.exports = {
  getHeroData,
};
