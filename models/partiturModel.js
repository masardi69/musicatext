const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function getAllPartitur(query) {
  let sqlQuery = "SELECT * FROM data_partitur";
  const values = [];

  if (query && Object.keys(query).length > 0) {
    sqlQuery += " WHERE";
    const conditions = [];

    if (query.judul_lagu) {
      conditions.push(" to_tsvector('indonesian', judul_lagu) @@ to_tsquery('indonesian', $1)");
      values.push(query.judul_lagu);
    }

    if (query.aransemen) {
      conditions.push(" to_tsvector('indonesian', aransemen) @@ to_tsquery('indonesian', $2)");
      values.push(query.aransemen);
    }

    if (query.keterangan) {
      conditions.push(" to_tsvector('indonesian', keterangan) @@ to_tsquery('indonesian', $3)");
      values.push(query.keterangan);
    }

    if (query.sumber) {
      conditions.push(" to_tsvector('indonesian', sumber) @@ to_tsquery('indonesian', $4)");
      values.push(query.sumber);
    }

    sqlQuery += conditions.join(" AND");
  }

  try {
    const result = await pool.query(sqlQuery, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getPartiturById(id) {
  try {
    const result = await pool.query("SELECT * FROM data_partitur WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

async function createPartitur(partitur) {
  try {
    const result = await pool.query("INSERT INTO data_partitur (judul_lagu, aransemen, keterangan, sumber, kategori, link_download) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
      partitur.judul_lagu,
      partitur.aransemen,
      partitur.keterangan,
      partitur.sumber,
      partitur.kategori,
      partitur.link_download,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

async function updatePartitur(id, partitur) {
  try {
    const result = await pool.query("UPDATE data_partitur SET judul_lagu = $1, aransemen = $2, keterangan = $3, sumber = $4, kategori = $5, link_download = $6 WHERE id = $7 RETURNING *", [
      partitur.judul_lagu,
      partitur.aransemen,
      partitur.keterangan,
      partitur.sumber,
      partitur.kategori,
      partitur.link_download,
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

async function deletePartitur(id) {
  try {
    await pool.query("DELETE FROM data_partitur WHERE id = $1", [id]);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllPartitur,
  getPartiturById,
  createPartitur,
  updatePartitur,
  deletePartitur,
};
