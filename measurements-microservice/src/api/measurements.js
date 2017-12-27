'use strict'

const status = require('http-status')
const Express = require('express')()

const request = require('request')

/**
 * Handles API requests for measurements microservce
 * @param {Express} app
 * @param {*}       options
 */
module.exports = (app, options) => {
  const {repo} = options
  const auth = options.authServer

  app.get('/measurements/:email', (req, res, next) => {
    const url = `http://${auth.hostname}:${auth.port}/auth/users/${req.params.email}`
    console.log(`Getting user by following address: ${url}`)

    request(url, (err, resp, body) => {
      if (err) {
        res.status(status.BAD_REQUEST).json({ 'response': 'bad user' })
        return
      }
      const userId = JSON.parse(body)._id
      repo.getMeasurementsByUser(userId).then(measurements => {
        res.status(status.OK).json(measurements)
      }).catch(next)
    })
  })

  app.post('/measurements', (req, res, next) => {
    repo.insertMeasurement(req.body.type, req.body.value, req.body.ownerId).then(result => {
      res.status(status.OK).json(result)
    }).catch(next)
  })
}
