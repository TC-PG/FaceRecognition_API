const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db ,bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res , bcrypt, db)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});


app.listen(process.env.PORT, () => console.log('The server has started'));