const dotenv = require("dotenv");
const express = require("express");
require("express-async-errors");

dotenv.config();
const cors = require("./app/middlewares/cors");
const errorHandler = require("./app/middlewares/errorHandles");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors);
app.use(routes);
// Error handlers
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`🔥 Server started at http://localhost:${PORT}`)
);
