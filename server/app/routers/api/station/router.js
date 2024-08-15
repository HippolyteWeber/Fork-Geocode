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
  update,
  destroy,
  truncateStationTable,
} = require("../../../controllers/stationActions");
const UploadFile = require("../../../middleware/UploadFile");
const InsertFile = require("../../../middleware/InsertFile");
const adminWall = require("../../../middleware/AdminWall");

router.get("/", readAll);
router.get("/:id", readOneById);
router.use(adminWall);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);
router.post("/truncate", truncateStationTable);
router.post("/upload", UploadFile, InsertFile);

/* ************************************************************************* */

module.exports = router;
