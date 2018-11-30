const express = require("express");
const { resolve } = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));

app.get("/api", (req, res) => {
  res.send("<h1>API WORKING!</h1>");
});

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

app
  .listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
  })
  .on("error", () => {
    console.log(
      `Server listen error, Do you already have a server running on PORT: ${PORT}`
    );
  });
