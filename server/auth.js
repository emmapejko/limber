const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// add schema model(e.g. Users) and connect to DB to authenticate
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id); 
});


passport.deserializeUser((id, done) => { 
  
  Users.findOne({
    where: { 
      id: id 
    }
  }).then((user) => { 
    done(null, user); 
  }).catch((err) => {
    console.log('Error deserial:', err);
  });
    
}); 

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const {sub, name, picture, email, family_name, given_name} = profile._json;
 

  Users.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (user) {
      return done(null, user);
    } else {
      Users.create({
        fullName: name,
        email: email,
        familyName: family_name,
        givenName: given_name,
        picture: picture,
        googleId: sub

        
      })
        .then(newUser => done(null, newUser))
        .catch( err => console.log(err));
    }
  }).catch(err => console.log('finderr', err));
}
));

