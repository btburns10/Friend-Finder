const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

//set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

app.use(express.static(path.join(__dirname, "app/public")));

// Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  