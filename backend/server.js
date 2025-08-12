const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;
const AuthRoutes = require("./Routes/AuthRoutes");
const NotesRoutes = require("./Routes/NotesRoutes");
const logger = require('./MiddleWare/logger')

app.use(express.json());

app.use(cors());
app.use(logger)


app.use("/auth/", AuthRoutes);
app.use("/", NotesRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
