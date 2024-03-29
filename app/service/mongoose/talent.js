// import model Talents
const Talents = require("../../api/v1/talent/model");
const { checkImage } = require("./image");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  // console.log(req.query)

  let condition = {organizer: req.user.organizer};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  console.log(result);

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  if(!image) throw new BadRequestError('mohon masukan Gambar')


  // cari image dengan field image
  await checkImage(image);

  // cari talents dengan field name
  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check) throw new BadRequestError("pembicara nama sudah terdafar");

  const result = await Talents.create({
    name,
    image,
    role: role || '-',
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};


const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  // cari image dengan field image
  await checkImage(image);

  const checktalent = await Talents.findById(id)

  if(!checktalent) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`);

  // cari talents dengan field name dan id selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara nama duplikat
  if (check) throw new BadRequestError("pembicara nama duplikat");



  const result = await Talents.findOneAndUpdate(
    { _id: id, organizer: req.user.organizer },
    {
      name,
      image,
      role,
      organizer: req.user.organizer
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  await result.deleteOne()

  return result;
};

const checkTalent = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkTalent,
};
