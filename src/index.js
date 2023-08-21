const express = require("express");
require("express-async-errors");

const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);

// Error handlers
app.use((error, req, resp, next) => {
  resp.sendStatus(500);
});

app.listen(PORT, () =>
  console.log(`🔥 Server started at http://localhost:${PORT}`)
);
