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
      //this is not getting email
      const email = profile.emails[0].value
      // will this get profile picture?
      const avatar = profile.photos ? profile.photos[0].value : undefined

      //   const userEmail = User.findOne({
      //       where: {email}
      //   })

      //   if (userEmail) {
      //     User.findOrCreate({
      //         where: {email},
      //         defaults: {avatar, facebookId}
      //       }).then((err, user) => {
      //         return cb(err, user)
      //       })
      //   }

      User.findOrCreate({
        where: {facebookId},
        defaults: {name, email, avatar}
      }).then((err, user) => {
        return cb(err, user)
      })
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
      // Successful authentication, redirect home.
      res.redirect('/video')
    }
  )
}
