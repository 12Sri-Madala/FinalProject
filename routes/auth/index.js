const passport = require('passport');
const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('<h1>Auth Status: [<span style="color: green">OK</span>]</h1>');
});

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/crease_dashboard');
});

router.get('/current-user', (req, res) => {
    const { user } = req;
     
    if(user){
        return res.send({
            username: user.userName,
            id: user._id
        });
    }

    res.status(401).send('Not Authorized');
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
