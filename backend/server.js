const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error signing up.');
        } else {
            res.status(200).send('Signup successful.');
        }
    });
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err || !user) {
            res.status(401).send('Invalid credentials.');
        } else {
            res.status(200).send('Login successful.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
try {
    const conn= mongoose.connect('mongodb://localhost:27017/restaurant');
 console.log("db connection success")
     
 } catch (error) {
     console.log(error)
     
 }
 