const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");

const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (!role) throw new BadRequestError("Role tidak boleh kosong");
  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  // check apakah ada duplikat email Organizers
  const check = await Users.findOne({ email });
  if (check) throw new BadRequestError("email User telah terdaftar");

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {

  const {} = req.body

  const result = await Users.find();

  result.map((user, index) => {
    delete user._doc.password;
  });

  // console.log(result[0].organizer.);

  return result;
};

// const getAdmin = async (req) => {

// }

module.exports = { createOrganizer, createUsers, getAllUsers };
