const express = require("express");
const router = express.Router();
const {
  getUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} = require("../controllers/unidades.controller");

// 🔗 Endpoints
router.get("/", getUnidades);            // GET http://localhost:3000/api/unidades
router.get("/:id", getUnidadById);       // GET http://localhost:3000/api/unidades/1
router.post("/", createUnidad);          // POST http://localhost:3000/api/unidades
router.put("/:id", updateUnidad);        // PUT http://localhost:3000/api/unidades/1
router.delete("/:id", deleteUnidad);     // DELETE http://localhost:3000/api/unidades/1

module.exports = router;
