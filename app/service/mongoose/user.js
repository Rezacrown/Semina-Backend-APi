const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");

const { BadRequestError } = require("../../errors");

// organizer
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


// admin
const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }
  // console.log('req.user')
  // console.log(req.user)

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

// owner dan organizer
const getAllUsers = async (req) => {
  const { email, role, organizer, id } = req.user;

  let condition = {};

  if (role !== 'owner') {
    condition = {
      organizer: organizer,
      role: 'admin'
      // email: {
      //   $ne: email
      // }
    }
  }

  const result = await Users.find(condition);

  result.map((user, index) => {
    delete user._doc.password;
  });

  // console.log(result[0].organizer.);

  return result;
};

// const getAdmin = async (req) => {
//     const {} = req.body
// }

module.exports = { createOrganizer, createUsers, getAllUsers };
