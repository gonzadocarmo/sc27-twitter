const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

const DEFAULT_PORT = 7777;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(bodyParser());

app.use("/", routes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
