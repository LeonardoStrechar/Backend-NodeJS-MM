const { response } = require("express");
const express = require("express");
const cors = require("cors");
const { AppError } = require("./errors/AppError");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3001, () => {
	console.log("Server is running");
});
