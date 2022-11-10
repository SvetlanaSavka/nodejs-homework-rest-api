const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleSaveErrors = require("../helpers/handleSaveErrors");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      require: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      require: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptions,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptions),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
