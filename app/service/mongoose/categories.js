const categories = require("../../api/v1/categories/model");

const { NotFoundError, BadRequestError } = require("../../errors");

const getAllCategories = async () => {
  const result = await categories.find();

  return result;
};

const createOneCategory = async (req) => {
  const { name, organizer } = req.body;

  const result = await categories.create({ name });

  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;
  const result = await categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id: ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { name } = req.body;
  const { id } = req.params;

    const check = await categories.findOne({
      name,
    _id: { $ne: id },
  });

  console.log(check);
  if (check) throw new BadRequestError(`kategori nama duplikat 123`);

  const result = await categories.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

  return result;
};

const deleteCategory = async (req) => {
    const { id } = req.params
    
    const result = await categories.findOne({
        _id: id
    })

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
    
    await result.deleteOne()

    return result;

}

const checkCategories = async (id) => { 
  const result = await categories.findOne({ _id: id })
  
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
  
  return result;
}

module.exports = {
  getAllCategories,
  createOneCategory,
  getOneCategory,
  updateCategories,
  deleteCategory,
  checkCategories,
};
