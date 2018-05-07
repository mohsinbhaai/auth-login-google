const router = require('express').Router();
const passport = require('passport');

//oauth login
router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    //res.send(req.user)
    res.redirect('/profile/');
});

router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}));

router.get('/github/redirect',passport.authenticate('github'), (req, res) => {
    res.send(req.user)
});

router.get('/logout', (req, res) => {
    res.send('you are logout');
});

module.exports = router;
