const express = require("express");
const cors = require("cors");
const path = require("path");

const Pizza = require("./models/pizzaModel.js");
const db = require("./db.js");
const pizzasRoute = require("./routes/pizzaRoute.js");
const userRoute = require("./routes/userRoute.js");
const ordersRoute = require("./routes/orderRoute.js");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", ordersRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
