const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const route = require("./routes");
const connectDB = require("./database/connection");

dotenv.config({ path: "config/config.env" });

const PORT = process.env.PORT || 8080;
const app = express();
// this will print the log request
app.use(morgan("tiny"));
// call the databases
connectDB();
app.use(cors());
// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load Routers
app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
