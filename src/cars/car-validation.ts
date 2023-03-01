const { Joi } = require('express-validation');

const carValidation = {
  body: Joi.object({
    brand: Joi.string().brand().required(),
    model: Joi.number().model().required(),
    fabricationYear: Joi.string().fabricationYear(),
    color: Joi.string().color(),
    cylinderCapacity: Joi.number().cylinderCapacity(),
  }),
};

export default carValidation;
