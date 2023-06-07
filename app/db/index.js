// (1) import package mongoose
const mongoose = require("mongoose");

// (2) kita import konfigurasi terkait MongoDB dari app/config.js
const { url_mongodb } = require("../config");

// (3) connect ke MongoDB menggunakan konfigurasi yang telah kita import
mongoose.connect(`${url_mongodb}`);

// (4) simpan koneksi dalam constant db
const db = mongoose.connection;

// (5) export db supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;
