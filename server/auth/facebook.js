const passport = require('passport')
const router = require('express').Router()
const {User} = require('../db/models')
const FacebookStrategy = require('passport-facebook').Strategy
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'photos', 'email']
  }

  passport.use(
    new FacebookStrategy(facebookConfig, function(
      accessToken,
      refreshToken,
      profile,
      cb
    ) {
      const facebookId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value
      const avatar = profile.photos ? profile.photos[0].value : undefined

      User.findOrCreate({
        where: {facebookId},
        defaults: {name, email, avatar}
      })
        .then(([user]) => {
          return cb(null, user)
        })
        .catch(cb)
    })
  )

  router.get(
    '/',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  )

  router.get(
    '/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function(req, res) {
      console.log('got here')
      // Successful authentication, redirect home.
      res.redirect('/video')
    }
  )
}
