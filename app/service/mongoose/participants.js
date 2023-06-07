const Events = require("../../api/v1/events/model");
const Orders = require("../../api/v1/orders/model");
const Payments = require("../../api/v1/payments/model");
const { NotFoundError } = require("../../errors");
const Participant = require("../../api/v1/participants/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, createTokenParticipant } = require("../../utils");
const { otpMail, orderMail } = require("../mail");

const moment = require("moment");

const getAllEvents = async (req) => {
  const result = await Events.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id, statusEvent: "Published" })
    .populate("category")
    .populate({ path: "talent", populate: "image" })
    .populate("image");

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  return result;
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  if (result.status === "tidak aktif") {
    throw new UnauthorizedError("Akun anda belum aktif");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;
  // participant new -> create data baru dengan status  tidak aktif
  //

  // jika email dan status tidak aktif
  let result = await Participant.findOne({
    email,
    // status: "tidak aktif",
  });

  // check status partcipant
  if (result && result.status !== "tidak aktif") {
    throw new BadRequestError("invalid credentials");
  }

  if (result && result.status === "tidak aktif") {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  }

  // create user participant jika tidak  ada
  if (!result) {
    result = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participant.findOne({
    email,
  });

  if (!check) throw new NotFoundError("Partisipan belum terdaftar");

  if (check && check.otp !== otp) throw new BadRequestError("Kode otp salah");

  const result = await Participant.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

// order participants
const getAllOrders = async (req) => {
  // console.log(req.participant);
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

/**
 * Tugas Send email invoice
 * TODO: Ambil data email dari personal detail
 *  */
const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;
  const { firstName, lastName, email } = personalDetail;

  // console.log(personalDetail);

  if (!firstName || !lastName || !email) {
    throw new BadRequestError("please don't empty PersonalDetail Information");
  }

  const checkingEvent = await Events.findOne({ _id: event });
  if (!checkingEvent) {
    throw new NotFoundError("Tidak ada acara dengan id : " + event);
  }

  const checkingPayment = await Payments.findOne({ _id: payment });

  if (!checkingPayment) {
    throw new NotFoundError(
      "Tidak ada metode pembayaran dengan id :" + payment
    );
  }

  // looping validation karena tickets adalah berupa array
  let totalPay = 0;
  let totalOrderTicket = 0;

  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new NotFoundError("Stock ticket event tidak mencukupi");
        } else {
          ticket.stock = ticket.stock - tic.sumTicket;
          totalOrderTicket = totalOrderTicket + tic.sumTicket;
          totalPay = totalPay + tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  // save perubahan set dari loop ke db
  await checkingEvent.save();

  // set history event dari data yang baru diupdate tadi
  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  // buat result dari instance Model Order
  const result = new Orders({
    date: moment(new Date()).format("MMMM Do YYYY, h:mm:ss"),
    personalDetail: {
      firstName,
      lastName,
      email,
    },
    totalPay,
    totalOrderTicket: totalOrderTicket || 1,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  // save ke Order field di db
  await result.save();

  // send email notification
  await orderMail(email, result);

  return result;
};

const getAllPaymentByOrganizer = async (req) => {
  const { organizer } = req.params;

  const result = await Payments.find({ organizer: organizer });

  return result;
};

module.exports = {
  getAllEvents,
  getOneEvent,
  signinParticipant,
  signupParticipant,
  activateParticipant,
  getAllOrders,
  checkoutOrder,
  getAllPaymentByOrganizer,
};
