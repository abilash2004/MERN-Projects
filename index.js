require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const urlRoute = require("./routes/url");
const URL = require("./models/url")
const { User, validate }= require("./models/user")
const PORT = process.env.PORT || 8000
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log("URL model:", URL);
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/api/url", async (req, res) => {
  try {
    const urls = await URL.find();
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.listen(PORT, console.log(`Listening on port ${PORT}...`));
