require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const moment = require('moment')
const databse = require("./databse");
const { validate, User } = require('./models/users');
const {validateEmail, Email} = require('./models/emails');
const bcrypt = require("bcrypt");
const { authValidate } = require('./services/auth');
const {sendEmail} = require('./services/email');

databse()

app.use(express.json());
app.use(cors());

app.post("/api/users", async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send({message: error});
        }
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(410).send({message: "User with this email, already exist"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({...req.body, password: hashPassword}).save();
        res.status(200).send({user: newUser, message: "User created successfully"});
    } catch(e) {
        res.status(500).send({message: "Internal server error", error: e})
    }
});

app.post('/api/auth', async (req, res) => {
    try {
        const {error} = authValidate(req.body);
        if (error) {
            return res.status(400).send({message: error});
        }
        var user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(401).send({message: "Invalid email or password"});
        }
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if (!validPassword) {
            return res.status(401).send({message: "Invalid email or password"});
        }
        const token = user.generateAuthToken();
        res.status(200).send({token: token, user: user, message: "Login Successful!"})
    } catch(e) {
        res.status(500).send({message: "Internal Server Error", error: e});
    }
});

app.get(`/api/:id/emails`, async (req, res) => {
    try {
        const userId = req.params.id;
        const emails = await Email.find({userId: userId});
        res.status(200).send({emails: emails})
    } catch (e) {
        res.status(500).send({message: "Internal Server Error", error: e});
    }
});

app.post('/api/emails', async (req, res) => {
    try {
        const {to, subject, text} = req.body
        const from = process.env.EMAIL
        const {error} = validateEmail(req.body);
        if (error) {
            return res.status(400).send({message: error});
        }
        sendEmail(to, from, subject, text)
        const email = await new Email({...req.body, createdAt: moment().format('MMMM Do YYYY')}).save();
        res.status(200).send({message: "email sent successfully", email: email}); 
    } catch (e) {
        res.status(500).send({message: "Internal Server Error", error: e });
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`))