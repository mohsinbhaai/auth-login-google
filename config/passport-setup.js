const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
//const GitHubStrategy = require('passport-github');
//const keys = require('./keys');
const User = require('../models/user-model');
//const GitUser = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user,id);
    });

});

passport.use(new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: '285195675691-ed3vko24kr74gbs195ftj0susk462ljt.apps.googleusercontent.com',
        clientSecret: '0OG3q3MNG2kyNL5XuqS_8kD-'
},(accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if (currentUser) {
            console.log('User is ' + currentUser);
            done(null, currentUser);
        } else {
            console.log('passport fired');
            console.log(profile);
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('saved ' + newUser);
                done(null, newUser);
            });
        }
    })

    })
);

// passport.use(new GitHubStrategy({
//     callbackURL: '/auth/github/redirect',
//     clientID: '5c76071228a2786f8445',
//     clientSecret: '9c64d01ce7a11001b9223337153702c1bb18adf9'
// }, (accessToken, refreshToken, profile, done) => {
//         console.log('passport fired');
//         console.log(profile);
//     new GitUser({
//         username: profile.login,
//         gitID: profile.id
//     }).save().then((GitUser) => {
//         console.log('saved' + GitUser);
//     }, (err) => {
//         console.log(err);
//     });
//     })
// );