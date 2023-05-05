const Events = require("../../api/v1/events/model");
const { checkImage } = require("./image");
const { checkCategories } = require("./categories");
const { checkTalent } = require("./talent");
const { BadRequestError, NotFoundError } = require("../../errors");

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category dan talent dengan field id
  await checkImage(image);
  await checkCategories(category);
  await checkTalent(talent);

  // cari Events dengan field name
  const check = await Events.findOne({
    title,
    organizer: req.user.organizer
  });

  // apa bila check true / data Events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check) throw new BadRequestError("judul event duplikat");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });

  return result;
};

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = {
    organizer: req.user.organizer
  };

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  // console.log("condition >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // console.log(condition);

  const result = await Events.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id  name" },
    });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id  name" },
    });

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category dan talent dengan field id
  await checkImage(image);
  await checkCategories(category);
  await checkTalent(talent);

  // check event sudah  teraftar atau belum
  const checkingEvent = await Events.findById(id);

  // jika id result false / null maka akan menampilkan error `Tidak ada pembicara dengan id` yang dikirim client
  if (!checkingEvent)
    throw new NotFoundError(`Tidak ada event dengan id :  ${id}`);

  // cari Events dengan field name dan id selain dari yang dikirim dari params
  const check = await Events.findOne({
    _id: { $ne: id },
    title,
    organizer: req.user.organizer,
  });

  // apa bila check true / data Events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check)
    throw new BadRequestError(
      "judul event duplikat atau Event belum terdaftar"
    );

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      // organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  await result.deleteOne();

  return result;
};

module.exports = {
  createEvents,
  getAllEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
