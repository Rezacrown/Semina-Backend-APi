const mongoose = require("mongoose");

const { Schema, model } = mongoose;




const talentScema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama kategori minimal 3 karakter"],
      maxLength: [20, "Panjang nama kategori maksimal 20 karakter"],
      required: [true, "Nama kategori harus diisi"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = model('Talent', talentScema)