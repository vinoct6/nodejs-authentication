const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().min(3).required(),
        password: Joi.string().required()
    };

    return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.validateUser = validateUser;
exports.User = User;