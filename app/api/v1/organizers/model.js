const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Penyelenggara harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", organizersSchema);
