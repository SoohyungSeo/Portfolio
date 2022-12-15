const mongoose = require("mongoose");

const { Schema } = mongoose;
const RoomsSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    chat: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rooms", RoomsSchema);
