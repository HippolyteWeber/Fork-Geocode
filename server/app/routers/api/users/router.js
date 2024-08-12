const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
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

router.post("/", validateUserSchema, checkExistingUser, hashPassword, create);

router.get("/:id", readOneById);

router.put("/", updateCar);

router.put("/update/:id", validateUserUpdate, updateUser);

router.use(adminWall);
router.get("/", readAll);
router.delete("/:id", destroy);
router.put("/:id", validateUserSchema, hashPassword, update);
/* ************************************************************************* */

module.exports = router;
