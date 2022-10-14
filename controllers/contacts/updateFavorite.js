const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateFavorite;

/* "name": "Savka Alina",
   "email": "savka@ukr.net",
    "phone": "(748) 206-2688",
    "isbn": "111-2-654-23456-7" */
