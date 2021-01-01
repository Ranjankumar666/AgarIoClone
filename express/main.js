const {app} = require("../server");

app.get("/", (req, res, next) => {
  res.send('Hello');
})

module.exports = app;
