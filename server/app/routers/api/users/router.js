const express = require("express");

const router = express.Router();

const {
  create,
  readAll,
  readOneById,
  updateCar,
  update,
  destroy,
  updateUser,
} = require("../../../controllers/usersActions");

const hashPassword = require("../../../services/hashpassword");

const validateUserSchema = require("../../../middleware/ValidateUserSchema");

const checkExistingUser = require("../../../middleware/CheckExistingUser");

const validateUserUpdate = require("../../../middleware/ValidateUserUpdate");

const adminWall = require("../../../middleware/AdminWall");

const userWall = require("../../../middleware/UserWall");

router.post("/", validateUserSchema, checkExistingUser, hashPassword, create);

router.get("/:id", userWall, readOneById);

router.put("/", userWall, updateCar);

router.put("/update/:id", userWall, validateUserUpdate, updateUser);

router.use(adminWall);
router.get("/", readAll);
router.delete("/:id", destroy);
router.put("/:id", validateUserSchema, hashPassword, update);

module.exports = router;
