const express = require('express');
const bodyParser = require("body-parser");
//const webpack = require('webpack');
const dotenv = require('dotenv');
const routes = require('./routes/index.route');
const cron = require('node-cron');
var cron_work = require('./src/cron');

cron.schedule('*/2 * * * *', () => { //every 2 min
	cron_work.connection_awake();
});

cron.schedule('1 */6 * * *', () => { //every 6 hour 1 min
	cron_work.token();
});

cron.schedule('3 */1 * * *', () => { //every 1 hour 3 minutes
	cron_work.mainBalance();
});

cron.schedule('5 */1 * * *', () => { //every 1 hour 5 minutes
	cron_work.balance();
});

cron.schedule('7 */1 * * *', () => { //every 1 hour 7 minutes
	cron_work.transactions();
});

cron.schedule('9 */1 * * *', () => { //every 1 hour 9 minutes
	cron_work.tokenTransactions();
});


// cron.schedule('*/2 * * * *', () => { //every 1 hours
// 	cron_work.balanceToken();
// });


// cron.schedule('*/2 * * * *', () => { //every 2 minutes
// 	cron_work.balance();
// });

const app = express();

const cors = require('cors')
app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, x-token-secret, x-csrf-token, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', false);
  res.cookie({ sameSite: 'strict', secure: true });
  next();
});

// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed;
const PORT = env.REACT_APP_SERVER_PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// main router
app.use('', routes);

module.exports = app;

/*
module.exports = () => {
  
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
*/