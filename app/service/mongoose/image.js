const image = require("../../api/v1/image/model");
const { NotFoundError } = require("../../errors");

// cara 1 berfungsi untuk generate url dan setelah di submit baru disimpan ke database
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

// cara 2 berfungsi untuk langsung genretae dan simpan di database
const createImage = async (req) => {
  const result = await image.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpg`,
  });

  return result;
};

// fungsi chekcking image
const checkImage = async (id) => {
  const result = await image.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ditemukan Gambar dengan id: ${id}`);

  return result;
};

module.exports = { createImage, checkImage };
