const express = require('express');
const authRoutes = require('./routes/auth-route');
const profileRoutes = require('./routes/profile-route');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express('');

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['authlogin']
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;
//mongodb://mohsin:mohsin@ds117070.mlab.com:17070/oauth
mongoose.connect('mongodb://localhost:27017/AuthLogin', () => {
    console.log('connected successfully');
});
//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//home route
app.get('/', (req, res) => {
  res.render('home');
});

//listening port
app.listen(3000, () => {
  console.log('listening on port 3000');
});
