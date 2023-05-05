const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");

const modelCategories = require('./model')
const {
  getAllCategories,
  createOneCategory,
  getOneCategory,
  updateCategories,
  deleteCategory,
} = require("../../../service/mongoose/categories");
const { json } = require("express");

const createCategory = async (req, res, next) => {
  try {
    const create = await createOneCategory(req);

    res.send(StatusCodes.CREATED, {
      msg: "succes created",
      data: create
    });
  } catch (error) {
    next(error);
  }
};

const findAllCategories = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    
    res.send(StatusCodes.OK, {data: result});
  } catch (error) {
    next(error);
  }
};

const findOneCategory = async ( req, res, next) => {
  try {
    const result = await getOneCategory(req);

    res.send(StatusCodes.OK, {data: result});
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);

    res.send(StatusCodes.OK, {
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destoryCategory = async (req, res, next) => {
  try {
    const result = await deleteCategory(req);

    res.send(StatusCodes.NO_CONTENT, {
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  findAllCategories,
  findOneCategory,
  update,
  destoryCategory,
};
