'use strict'
const status = require('http-status')
const hat = require('hat')

module.exports = (app, options) => {
  const {repo} = options

  // Get user info
  app.get('/auth/users', (req, res, next) => {
    res.status(status.FORBIDDEN).json({'response': 'unauthorized'})
  })

  // Get user by email
  app.get('/auth/users/:email', (req, res, next) => {
    if (req.params.email == null) {
      res.status(status.NO_CONTENT).json({ 'response': 'expected parameter \'id\'' })
      return
    }

    repo.getUserByEmail(req.params.email).then(user => {
      res.status(status.OK).json(user)
    }).catch(next)
  })

  // Add new user
  app.post('/auth/users', (req, res, next) => {
    repo.getUserByEmail(req.body.email).then(user => {
      if (user) {
        res.status(status.FOUND).json({ 'response': 'user with provided email already exist' })
        return
      }
      repo.insertUser(req.body).then(result => {
        res.status(status.OK).json(result)
      }).catch(next)
    }).catch(next)
  })

  // Get access token
  app.post('/auth/login', (req, res, next) => {
    repo.getUserByEmail(req.body.email).then(user => {
      if (user == null) {
        res.status(status.NOT_FOUND).json({ 'response': 'unknown usesr' })
        return
      }
      if (user.password !== req.body.password) {
        res.status(status.UNAUTHORIZED)
        return
      }

      const token = hat()

      repo.insertUserToken(token, user._id, null).then(result => {
        res.status(status.OK).json({ 'token': token })
      }).catch(next)
    }).catch(next)
  })
}
