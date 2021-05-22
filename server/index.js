const express = require('express');
const bodyParser = require("body-parser");

const service = require("./src/service")

const app = express();

//app.use(cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, x-token-secret, x-csrf-token, Content-Type, Accept, Authorization");
  next();
});

 
// app.post('/', (req, res) => {
//   res
//     .status(200)
//     .send('Hello, world!')
//     .end();
// });

app.use('', service)

// router.post('/register', getRegister)
// router.post('/login', getLogin)

// Start the server
const PORT = process.env.SERVER_PORT || 8080;

console.log(PORT)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  };
};