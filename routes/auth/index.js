const passport = require('passport');
const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('<h1>Auth Status: [<span style="color: green">OK</span>]</h1>');
});

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/application_page');
});

router.get('/current-user', (req, res) => {
    res.send(req.user);
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
    res.send({
        success: true,
        message: 'User logged out'
    });
})

module.exports = router;
