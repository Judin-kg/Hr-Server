const express = require("express");
const router = express.Router();
const TeamHead = require("../models/TeamHead");

router.post("/add", async (req, res) => {
  await new TeamHead(req.body).save();
  res.json({ message: "Added" });
});

router.get("/all", async (req, res) => {
  res.json(await TeamHead.find());
});

router.delete("/delete/:id", async (req, res) => {
  await TeamHead.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
