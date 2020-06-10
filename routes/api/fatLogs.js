const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const FatLog = require("../../models/FatLog");

// @route GET api/items
//@desc Get ALL Items
// @access Public
router.get("/:username", (req, res) => {
  FatLog.find({
    username: req.params.username
  })
    .sort({ date: -1 })
    .then(fatLogs => res.json(fatLogs));
});

// @route POST api/items
//@desc Create An Item
// @access Private

router.post("/", auth, (req, res) => {
  const username = req.body.username;
  const food = req.body.food;
  const unit = req.body.unit;
  const quantity = req.body.quantity;
  const fat = req.body.fat;
  const date = Date.parse(req.body.date);
  const meal = req.body.meal;

  if (!food || !unit || !quantity || !fat || !date || !meal) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newFatLog = new FatLog({
    username,
    food,
    unit,
    quantity,
    fat,
    date,
    meal
  });

  newFatLog.save().then(fatLog => res.json(fatLog));
});

// @route DELETC api/items/:id
//@desc DELETE An Item
// @access Private

router.delete("/:username/:id", auth, (req, res) => {
  FatLog.findById(req.params.id)
    .then(fatLog => fatLog.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
