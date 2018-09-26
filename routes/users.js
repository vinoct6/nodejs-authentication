const { User, userSchema, validateUser } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/", async (request, response) => {
    const { error } = validateUser(request.body);

    if (error) {
        response.status(400).send(new Error(error));
        return;
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(request.body.password, salt);

    let user = new User(_.pick(request.body, ['name', 'email']));
    user.password = hashedPassword;

    user = await user.save();
    response.send(_.pick(user, ['name', 'email']));
});

module.exports = router;