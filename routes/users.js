const { User, userSchema, validateUser } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const router = express.Router();

router.post("/", async (request, response) => {
    const userRequest = request.body;
    const { error } = validateUser(userRequest);

    if (error) {
        response.status(400).send(new Error(error));
        return;
    }
    let user = new User(userRequest);
        user = await user.save();
   

    response.send(_.pick(user, ['name', 'email']));
});

module.exports = router;




