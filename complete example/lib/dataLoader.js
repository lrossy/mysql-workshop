const md5 = require('md5');
const validate = require('../lib/validations');
const bcrypt = require('bcrypt-as-promised');
const knex = require('knex')({ client: 'mysql' });
const util = require('./util');

const HASH_ROUNDS = 10;
const USER_FIELDS = ['user_id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'];

class DataLoader {

  constructor(conn) {
    this.conn = conn;
  }

  query(sql) {
    return this.conn.query(sql);
  }

  // User methods
  createUser(userData) {

    const errors = validate.user(userData);
    if (errors) {
      return Promise.reject({ errors: errors });
    }

    return bcrypt.hash(userData.password, HASH_ROUNDS)
    .then((hashedPassword) => {

      return this.query(
        knex
          .insert({
            email: userData.email,
            password: hashedPassword,
            firstName: userData.firstName,
            lastName: userData.lastName
          })
          .into('users')
          .toString()
      );
    })
    .then((result) => {
      return this.query(
        knex
        .select(USER_FIELDS)
        .from('users')
        .where('user_id', result.insertId)
        .toString()
      );
    })
    .then(user => {
        var hash = md5(userData.email);
        var url = `https://www.gravatar.com/avatar/${hash}`;
        user[0].avatarUrl = url;
        return user;
    })
    .catch((error) => {
      // Special error handling for duplicate entry
      if (error.code === 'ER_DUP_ENTRY') {
        return Promise.reject({status: 'Error', message: 'A user with this email already exists'});
      } else {
        throw error;
      }
    });
  }

  deleteUser(userId) {
    return this.query(
      knex.delete().from('users').where('id', userId).toString()
    );
  }
  
  getUserFromSession(sessionToken) {

    return this.query(
      knex
      .select(util.joinKeys('users', USER_FIELDS))
      .from('sessions')
      .join('users', 'sessions.user_id', '=', 'users.user_id')
      .where({
        'sessions.token': sessionToken
      })
      .toString()
    )
    .then((result) => {

      if (result.length === 1) {
        return result[0];
      }

      return null;
    });
  }
  
  createTokenFromCredentials(email, password) {
    //TODO: add exp to session and timeout after 60 min inactivity
    const errors = validate.credentials({
      email: email,
      password: password
    });
    if (errors) {
      return Promise.reject({ errors: errors });
    }

    let sessionToken;
    let user;
    return this.query(
      knex
      .select('user_id', 'password')
      .from('users')
      .where('email', email)
      .toString()
    )
    .then((results) => {
      if (results.length === 1) {
        user = results[0];
        return bcrypt.compare(password, user.password).catch(() => false);
      }

      return false;
    })
    .then((result) => {
      if (result === true) {
        return util.getRandomToken();
      }
      return Promise.reject({ message: 'Username or password invalid' });
    })
    .then((token) => {
      sessionToken = token;
      return this.query(
        knex
        .insert({
          user_id: user.user_id,
          token: sessionToken
        })
        .into('sessions')
        .toString()
      );
    })
    .then(() => sessionToken);
  }

  deleteToken(token) {
    return this.query(
      knex
      .delete()
      .from('sessions')
      .where('token', token)
      .toString()
    )
    .then(() => true);
  }

}

module.exports = DataLoader;
