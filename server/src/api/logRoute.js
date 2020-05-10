const { Router } = require("express");
const Entry = require("../model/entry");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const entry = new Entry(req.body);
    console.log(req.body);
    const createdEntry = await entry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
