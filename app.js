const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
var corsOptions = {
    origin: "http://localhost:8000"
};

app.use(cors(corsOptions));
db.sequelize.sync();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
