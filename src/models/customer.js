const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      CSSMathMax: 20,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
  })
);

function validateCustomer(customers) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    phone: Joi.string().min(5).max(10).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customers);
}
function validateCustomerOnUpdate(customers) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phone: Joi.string().min(10).max(10),
    isGold: Joi.boolean(),
  });
  return schema.validate(customers);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
exports.validateCustomerOnUpdate = validateCustomerOnUpdate;
