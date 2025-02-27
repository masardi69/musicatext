const express = require("express");
const dotenv = require("dotenv");
const partiturRoutes = require("./routes/partiturRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/partitur", partiturRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server is running on  ${port}`);
});
