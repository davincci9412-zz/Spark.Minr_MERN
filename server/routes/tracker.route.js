const express = require('express');	
const router = express.Router();

const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const config = require('../config/mongoose'); 

const History = require('../models/History');

router.post('/add', (req, res) => {
	history = {user_id:req.body.user_id, wallet_address:req.body.wallet_address, wallet_name:req.body.wallet_name, wallet_description:req.body.wallet_description, wallet_chain:req.body.wallet_chain, create:new Date()}
	History.findOneAndUpdate({ user_id: req.body.user_id, wallet_address:req.body.wallet_address }, history).then((result)=>{
		if (result){	
			return res.status(200).json({status:"ok"});	
		} else {
			History.create(history, function (err, doc){
				if (err){
					return res.status(400).json({status:"fail"});
				} else {
					return res.status(200).json({status:"ok"});
				}					
			})
		}
	})						
});

router.get('/history', (req, res) => {
	result = History.find({user_id:req.query.user_id}).lean().then((result)=>{
		return res.status(200).json(result);
	})
});

router.get('/delete', (req, res) => {
	History.findOneAndDelete({ user_id: req.query.user_id, wallet_address:req.query.wallet_address }).then((result)=>{
		if (result){	
			return res.status(200).json({status:"ok"});	
		} else {
			History.create(history, function (err, doc){
				if (err){
					return res.status(400).json({status:"fail"});
				} else {
					return res.status(200).json({status:"ok"});
				}					
			})
		}
	})	
});

module.exports = router;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}