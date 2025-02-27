const partiturModel = require("../models/partiturModel");

async function daftarLagu(req, res) {
  try {
    const partitur = await partiturModel.getAllPartitur(req.query);
    res.json(partitur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function detailLagu(req, res) {
  try {
    const partitur = await partiturModel.getPartiturById(req.params.id);
    if (!partitur) {
      return res.status(404).json({ message: "Partitur tidak ditemukan" });
    }
    res.json(partitur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function tambahLagu(req, res) {
  try {
    const partitur = await partiturModel.createPartitur(req.body);
    res.status(201).json(partitur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function editLagu(req, res) {
  try {
    const partitur = await partiturModel.updatePartitur(req.params.id, req.body);
    res.json(partitur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function hapusLagu(req, res) {
  try {
    await partiturModel.deletePartitur(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  daftarLagu,
  detailLagu,
  tambahLagu,
  editLagu,
  hapusLagu,
};
