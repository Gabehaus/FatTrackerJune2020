const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");

const Schema = mongoose.Schema;
mongoose.Types.Decimal128.prototype.toJSON =
  mongoose.Types.Decimal128.prototype.toString;

const FatLogSchema = new Schema(
  {
    username: { type: String, required: true },
    food: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    meal: { type: String, required: true },
    fat: { type: mongoose.Schema.Types.Decimal128, required: true }
  },
  {
    timestamps: false
  }
);

const FatLog = mongoose.model("fatLog", FatLogSchema);

module.exports = FatLog;
