const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const DEFAULT_PORT = 7777;
const PORT = process.env.PORT || DEFAULT_PORT;

const swaggerOptions = {
  swaggerDefinition: {
    info: "Twitter API Demo",
    servers: [`http://localhost:${PORT}`]
  },
  apis: [path.join(__dirname, "routes.ts")]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(bodyParser());
app.use("/", routes);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.use("/swagger", swaggerUi.serve);
app.get("/swagger", swaggerUi.setup(swaggerDocs));
