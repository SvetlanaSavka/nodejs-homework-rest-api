const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    isbn: {
      type: String,
      unique: true,
      match: isbnRegexp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  isbn: Joi.string().pattern(isbnRegexp).required(),
});
const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
/*  "isbn": "123-4-456-89123-4" */
