const { User, userSchema, validateUser } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
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
    response.send(user);
});

module.exports = router;




