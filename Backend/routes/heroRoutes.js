const express = require("express");
const router = express.Router();

const heroController = require("../controllers/heroController");

router.get("/hero", heroController.getHeroData);

module.exports = router;
