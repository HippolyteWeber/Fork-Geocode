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

router.post("/", create);
router.get("/", readAll);
router.get("/:id", readOneById);
router.put("/:id", update);
router.delete("/:id", destroy);
router.post("/truncate", truncateStationTable);

/* ************************************************************************* */

module.exports = router;
