const express = require('express');
const md5 = require('md5');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const authController = express.Router();
  
  authController.post('/users', (req, res) => {
  
    dataLoader.createUser({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    .then(user => res.status(201).json(user[0]))
    .catch(err => {
      console.log(err, "401 error");
      return res.status(401).json(err);
    });
  });
  
  authController.post('/sessions', (req, res) => {
    dataLoader.createTokenFromCredentials(
      req.body.email,
      req.body.password
    )
    .then(token => res.status(201).json({ token: token }))
    .catch(err => {
      res.status(401).json(err)
    });
  });
  
  // Delete a session (logout)
  authController.delete('/sessions', onlyLoggedIn, (req, res) => {
    console.log('sessionToken', req.sessionToken)
    if (req.sessionToken) {
      dataLoader.deleteToken(req.sessionToken)
    .then(() => res.status(204).end())
      .catch(err => res.status(400).json(err));
    } else {
      res.status(401).json({ error: 'Invalid session token' });
    }
  });

  authController.get('/me', onlyLoggedIn, (req, res) => {

    if (req.sessionToken) {
      dataLoader.getUserFromSession(req.sessionToken)
      .then(result => {
        return {
          "id": result.users_id,
          "email": result.users_email,
          "firstName": result.users_firstName,
          "lastName": result.users_lastName,
          "users_createdAt": result.users_createdAt,
          "users_updatedAt": result.users_updatedAt
        }
      })
      .then(user => {
        var hash = md5(user.email);
        var url = `https://www.gravatar.com/avatar/${hash}`;
        user.avatarUrl = url;
        res.status(200).json(user);
      })
    }
    else {
      res.status(401).json({ error: 'Invalid session token' });
    }
  });

  return authController;
};