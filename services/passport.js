const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const { googleConfig } = require('../config');

const User = mongoose.model('userbases');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    const existingUser = await User.findById(userId);
    
    done(null, existingUser);
});

let callbackURL = '/auth/callback';
if (process.env.NODE_ENV === 'production'){
    callbackURL = 'https://www.creasetabs.com' + callbackURL;
}

passport.use(new GoogleStrategy({
    clientID: googleConfig.googleClientID,
    clientSecret: googleConfig.googleClientSecret,
    callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    console.log('GOOGLE PROFILE:', profile);

    if (existingUser) {
        done(null, existingUser);
    } else {
        console.log(profile.emails[0].value )
        const newUser = await new User({ 
            googleId: profile.id,
            userName: profile.emails[0].value 
        }).save();
            
        done(null, newUser);
    }
}));
