const Joi = require("joi");

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(15).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

  const { error, value } = schema.validate(req);

  if (error) {
    return { error: error.details };
  }
  return { value };
}

exports.validate = validate;
