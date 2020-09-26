const express = require("express");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 7777;

app.use("/", routes);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
