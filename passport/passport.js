const { Op } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const randomString = require('randomstring');
const LocalStrategy = require('passport-local').Strategy;
const uuidV4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const mailer = require('../services/sendgrid.mail.service');
const EmailTemplateService = require('../services/email.template.service');
const config = require('../config');
const reduceUserData = require('../utils/reduceUserData');
const reduceErrorMessage = require('../utils/reduceErrorMessage');
module.exports = function (passport, User) {
  passport.serializeUser((user, done) => {
    done(null, user.uuid);
  });
  passport.deserializeUser((uuid, done) => {
    User.findOne({ where: { uuid } }).then((user) => {
      if (user) {
        done(user.errors, null);
      } else {
        done(null, user);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    // other request fields handle

    const generateHash = require("../utils/generateHash");

    return User.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    }).then((user) => {
      if (user) {
        return done(null, false, {
          message: 'Email already taken!'
        });
      }
      const userPassword = generateHash(password);
      const emailConfirmationToken = randomString.generate(6);
      const uuid = uuidV4();
      const payload = {
        uuid,
        email
      };
      const appSecret = config.app.secret;
      const accessToken = jwt.sign(payload, appSecret, {
        expiresIn: 60 * 30 // expires in 30 min
      });
      const refreshToken = jwt.sign(payload, appSecret, {
        expiresIn: '90d' // expires in 3 month
      });
      return User.create({
        uuid,
        email,
        access_token: accessToken,
        refresh_token: refreshToken,
        password: userPassword,
        emailConfirmationToken
      }).then(async (newUser) => {
        if (!newUser) {
          return done(null, false, {
            message: 'create failure'
          });
        }
        // send register mail
        const link = `${config.app.url}/auth/confirm-email?token=${emailConfirmationToken}`;
        const text = await EmailTemplateService.renderHtmlTemplate('register', { link, code: emailConfirmationToken, project: config.app.project });
        mailer.send(
          {
            to: email,
            from: config.email.from.support,
            subject: 'Please activate your account',
            html: text
          }
        ).then(() => {
          console.log('mail sent success: ');
        }).catch(err => {
          console.log('mail send error: ', err);
        });
        return done(null, newUser);
      })
        .catch(error => {
          console.log(error);
          return done(null, false, {
            message: reduceErrorMessage(error)
          });
        });
    });
  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    const isValidPassword = (userpass, pwd) => (bcrypt.compareSync(pwd, userpass));
    User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'Email does not exist'
        });
      }

      if (!user.emailConfirmed) {
        return done(null, false, {
          message: 'Email is not verified'
        });
      }

      if (!isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Password does not match'
        });
      }
      const payload = {
        uuid: user.get().uuid,
        email: user.get().email
      };
      const appSecret = config.app.secret;
      const accessToken = jwt.sign(payload, appSecret, {
        expiresIn: 60 * 30 // expires in 30 min
      });
      const refreshToken = jwt.sign(payload, appSecret, {
        expiresIn: '30d' // expires in 30 min
      });
      user.update({
        accessToken,
        refreshToken
      })
        .then(() => {
          const userData = {
            ...reduceUserData(user),
            accessToken: accessToken
          };
          return done(null, userData);
        })
        .catch(err => {
          console.log('Error while update access token for login', err);
          return done(null, false, {
            message: 'Something went wrong while login'
          });
        });
    }).catch((err) => {
      console.log('Error: ', err);
      return done(null, false, {
        message: 'Something went wrong'
      });
    });
  }));
};