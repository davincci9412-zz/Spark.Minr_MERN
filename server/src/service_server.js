const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

var mongoose = require('mongoose');

mongoose
  .connect(env.REACT_APP_MONGO_URL, {
    dbName: 'mockUsers',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

const User = require('../models/User');

const validateLoginInput = require('../validation/login');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists.' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.json({ success: 'User registered sucessfully.' });
            })
            .catch((err) => {
              res.status(400).json({ failed: 'Error ocurred.' });
            });
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  var email = req.body.email;
  var password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ email: 'Email not found.' });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password incorrect.' });
      }
    });
  });
});

const request = require('postman-request');

router.get('/exchange2', (req, res) => {
	var url  = 'https://api-cloud.bitmart.com/spot/v1/ticker?symbol='+req.query.symbol+'_USDT'
	request(url, function (error, response, body) {
		return res.status(200).json(body);
	});
});

router.get('/exchange3', (req, res) => {
	var url  = 'https://whitebit.com/api/v1/public/ticker?market='+req.query.symbol+'_USDT'
	request(url, function (error, response, body) {
		return res.status(200).json(body);
	});
});

router.get('/transaction', (req, res) => {
	var url  = "https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/"+req.query.token+"/market_chart/?vs_currency=usd&days=1"
	request(url, function (error, response, body) {
		return res.status(200).json(body);
	});
});

router.get('/trend', (req, res) => {
	var url  = "https://api.coingecko.com/api/v3/coins/"+req.query.chain+"/market_chart?vs_currency=usd&days=2"
	request(url, function (error, response, body) {
		return res.status(200).json(body);
	});
});


module.exports = router;
