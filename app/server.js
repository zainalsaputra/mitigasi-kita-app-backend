// const cors = require("cors");
const express = require("express");
const http = require("http");
const setupSwagger = require("./docs/swagger.docs");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// app.set("trust proxy", 1);

// const helmet = require("helmet");
// app.use(helmet());

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/index");
const errorHandler = require("./middlewares/error_handler.middleware");
// const { requestLimiter } = require('./middleware/rateLimit');

setupSwagger(app);

app.use(routes);
// app.use(requestLimiter);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT,HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});

const { connectToDatabase } = require("./config/mongo.config");

connectToDatabase();

module.exports = app;
