var express = require("express");
var router = express.Router();

const userController = require("../Controller/userController");
router.get("/user", userController.userlist);
router.get("/del", userController.deleteUser);
router.post("/add", userController.addCar);
router.get("/modify", userController.modifyCar);
router.get("/search", userController.searchCar);
module.exports = router;
