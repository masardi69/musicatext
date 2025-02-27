const express = require("express");
const partiturController = require("../controllers/partiturController");

const router = express.Router();

router.get("/", partiturController.daftarLagu);
router.get("/:id", partiturController.detailLagu);
router.post("/", partiturController.tambahLagu);
router.put("/:id", partiturController.editLagu);
router.delete("/:id", partiturController.hapusLagu);

module.exports = router;
