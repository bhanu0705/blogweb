const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model'); // Make sure to import the User model
const router = express.Router();


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Error: User not found");
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch); 
        console.log(password+" "+user.password);// Log whether the password matches

        if (!isMatch) {
            return res.status(400).send("Error: Invalid credentials");
        }

        res.json({
            msg: "Success: user logged in",
            role: user.role
        });
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});
module.exports = router;