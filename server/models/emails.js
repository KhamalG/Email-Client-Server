const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    userId: {type: String, required: true},
    createdAt: {type: Date, required: true},
    to: {type: String, required: true},
    subject: {type: String, required: true},
    text: {type: String, required: true}
});

const Email = mongoose.model("emails", emailSchema);

const validateEmail = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required().label("UserId"),
        to: Joi.string().email().required().label("To"),
        subject: Joi.string().required().label("Subject"),
        text: Joi.string().required().label("Text"), 
    });
    return schema.validate(data);
}

module.exports= {Email, validateEmail}