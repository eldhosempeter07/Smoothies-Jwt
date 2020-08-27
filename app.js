const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} =require('./middleware/auth') 
const app = express();

app.use(express.json());
// middleware
app.use(express.static('public'));
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://eldhosempeter07:test1234@node-auth.bmvxh.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));  

// routes
// app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));

app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


