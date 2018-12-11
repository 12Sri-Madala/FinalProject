const passport = require('passport');
const router = require('express').Router();

router.get('/test', (req, resp) => {
    resp.send('<h1>Auth Status: [<span style="color: green">OK</span>]</h1>');
});

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}), (req, resp) => {
    console.log()
});

router.get('/callback', passport.authenticate('google'), (req, resp) => {
    resp.redirect('/');
});

router.get('/current-user', (req, resp) => {
    // console.log(req._json.displayName)
    resp.send(req.user);
})

router.get('/logout', (req, resp) => {
    req.logout();

    resp.send({
        success: true,
        message: 'User logged out'
    });
})

module.exports = router;
