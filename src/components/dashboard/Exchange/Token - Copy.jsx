import React, { Component }  from 'react';
import axios from 'axios';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import { trackPromise } from 'react-promise-tracker';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
};

const datasByRow = [
  
];

class Inputs extends React.Component {
  constructor(props) {
	super(props);
	this.state = { formErrors: {token: '', buy_fee: '',sell_fee: '', buffer_fee: ''}, tokenValid: false,  buyValid: false, sellValid: false,  bufferValid: false, formValid: false, token:'', exchange1:'', exchange2:'', exchange3:'', potential:'', percentage:'', buy:'', sell:'', status:'', transaction:'', trend:'', buy_fee:'', transfer_fee:'', sell_fee:'', buffer_fee:'', total:''};
	this.handleClear = this.handleClear.bind(this);
  }
  handleChange(propertyName, e) {	  
	const change = {};
	change[propertyName] = e.target.value;
	this.setState(change);
	this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value) });
  }
  handleClear() {
	this.setState({ token:'', exchange1:'', exchange2:'', exchange3:'', potential:'', percentage:'', buy:'', sell:'', status:'', transaction:'', trend:'', transfer_fee:'', total:''});
  }
  
  validateField(fieldName, value) {
    const tokenValid = this.state.tokenValid;
    const buyValid = this.state.buyValid;
	const sellValid = this.state.sellValid;
    const bufferValid = this.state.bufferValid;

    switch(fieldName) {
      case 'token':
        tokenValid = value.length >= 1;
        this.state.formErrors.token = tokenValid ? '': 'empty';
        break;
	  case 'buy_fee':
        buyValid = value.length >= 1;
        this.state.formErrors.buy_fee = buyValid ? '': 'empty';
        break;
	  case 'sell_fee':
        sellValid = value.length >= 1;
        this.state.formErrors.sell_fee = sellValid ? '': 'empty';
        break;
      case 'buffer_fee':
        bufferValid = value.length >= 1;
        this.state.formErrors.buffer_fee = bufferValid ? '': 'empty';
        break;
      default:
        break;
    }
    this.setState({formErrors: this.state.formErrors,
                    tokenValid: tokenValid,
                    buyValid: buyValid,
					sellValid: sellValid,
                    bufferValid: bufferValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.tokenValid && this.state.buyValid && this.state.sellValid && this.state.bufferValid});
  }
  
  render(){
	return  <div className='row my-3'>
	  <Input name='token' change={this.handleChange.bind(this, 'token')} value={this.state.token} placeholder='Token' />
	  <Input0 name='buy_fee' change={this.handleChange.bind(this, 'buy_fee')} value={this.state.buy_fee} placeholder='Fees In' />
	  <Input0 name='sell_fee' change={this.handleChange.bind(this, 'sell_fee')} value={this.state.sell_fee} placeholder='Fees Out' />
	  <Input0 name='buffer_fee' change={this.handleChange.bind(this, 'buffer_fee')} value={this.state.buffer_fee} placeholder='Buffer Fee' />
	  <div className='col-md-1'><AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} /></div>
	  <div className="col-md-2"></div>
	  <div className="col-md-3 mt-3">
		<ul className="navbar-nav ">
			<li className="nav-item"><a href="https://coinmarketcap.com/" target='_blank' className="out-link" rel="noreferrer">Coin Market Cap</a></li>
			<li className="nav-item"><a href="https://coingecko.com/" target='_blank' className="out-link" rel="noreferrer">CoinGecko</a></li>
			<li className="nav-item"><a href="https://poocoin.app/" target='_blank' className="out-link" rel="noreferrer">Poocoin</a></li>
			<li className="nav-item"><a href="https://bscscan.com/" target='_blank' className="out-link" rel="noreferrer">BSC Scan</a></li>
		</ul>
	  </div>
	</div>
  }
}

class Input extends React.Component {
  constructor(props) {
	super(props);
	this.state = { value: this.props.value };
  }
  render(){
	return <div className='col-md-3'>
	  <input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'/>
	</div>
  }
}

class Input0 extends React.Component {
  constructor(props) {
	super(props);
	this.state = { value: this.props.value };
  }
  render(){
	return <div className='col-md-1'>
		<div className="input-group">
			<input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'/>
			<div className="input-group-postpend"><div className="input-group-text">%</div></div>
		</div>	  
	</div>
  }
}

class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}
	
	render(){
		return <td>
		  <button type="button" className="btn btn-danger" onClick={this.onClick.bind(this)}>Delete</button>
		</td>
	}
}

class UpdateButton extends React.Component {
	onClick() {
	  this.props.update.call(null, this.props.uuid, this.state.buy_token_input);
	}
	handleChange(propertyName, e) {	  
		const change = {};
		change[propertyName] = e.target.value;
		this.setState(change);
	}
	render(){
		return <td><div className="input-group"><input type='text' name="buy_token_input" onChange={this.handleChange.bind(this, 'buy_token_input')} className='form-control' /><button type="button" className="input-group-postpend btn btn-success" onClick={this.onClick.bind(this)}>Go</button></div></td>		
	}
}

class AddButton extends React.Component {
	onClick(){
	  if(this.props.newData.token.length > 0 && this.props.newData.buy_fee.length > 0 && this.props.newData.sell_fee.length > 0 && this.props.newData.buffer_fee.length > 0){	
		this.props.create.call(null, this.props.newData.token, this.props.newData.exchange1, this.props.newData.exchange2, this.props.newData.exchange3, this.props.newData.potential, this.props.newData.percentage, this.props.newData.buy, this.props.newData.sell, this.props.newData.status, this.props.newData.transaction, this.props.newData.trend, this.props.newData.buy_fee, this.props.newData.transfer_fee, this.props.newData.sell_fee, this.props.newData.buffer_fee, this.props.newData.total, this.props.newData.buy_token_input, this.props.newData.after_purchase, this.props.newData.after_transfer, this.props.newData.trading, this.props.newData.pair_price, this.props.newData.post_transfer, this.props.newData.BNB_price, this.props.newData.BNBs, this.props.newData.token_price, this.props.newData.new_tokens, this.props.newData.increase  );
		this.props.clear.call(null);
	  }
	}
	render(){
		return <button type="button" style={{ "width": "100%" }} className="btn btn-success add" onClick={this.onClick.bind(this)} >Add</button>
	}
}

class Column extends React.Component {
  render(){
	if (this.props.type=="token"){
		const token_label = "Safemoon("+this.props.placeholder.toString().substring(0,6) + "..."+this.props.placeholder.toString().substring(36,42)+")";
		return <td>{token_label}</td> 
	} else if (this.props.placeholder == "Red"){
		return <td><span className="text-danger">
		  {this.props.placeholder}
		</span></td> 
	} else if (this.props.placeholder == "Green"){
		return <td><span className="text-success">
		  {this.props.placeholder}
		</span></td> 
	} else if (this.props.placeholder == "Negative"){
		return <td><span className="red-arrow text-danger">
		  {this.props.placeholder}<span className="fa fa-arrow-down"></span>
		</span></td> 
	} else if (this.props.placeholder == "Positive"){
		return <td><span className="green-arrow text-success">
		  {this.props.placeholder}<span className="fa fa-arrow-up"></span>
		</span></td> 
	} if (this.props.type == "buy_fee" || this.props.type == "sell_fee" || this.props.type == "transfer_fee" || this.props.type == "buffer_fee" || this.props.type == "total"){
		return <td>{this.props.placeholder}%</td> 
	} else {
		return <td>{this.props.placeholder}</td> 
	}	
  }
}

class Row extends React.Component {
  render(){
	return  <tr>
	<Column type='token' placeholder={this.props.token} />
	<Column type='exchange1' placeholder={this.props.exchange1} />
	<Column type='exchange2' placeholder={this.props.exchange2} />
	<Column type='exchange3' placeholder={this.props.exchange3} />
	<Column type='potential' placeholder={this.props.potential} />
	<Column type='percentage' placeholder={this.props.percentage} />
	<Column type='buy' placeholder={this.props.buy} />
	<Column type='sell' placeholder={this.props.sell} />
	<Column type='status' placeholder={this.props.status} />
	<Column type='transaction' placeholder={this.props.transaction} />
	<Column type='trend' placeholder={this.props.trend} />
	<DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
	</tr>
  }
}

class Table extends React.Component {
  render(){
	return <table className="table table-bordered">
				<thead>
					<tr>
						{[
							'Token','Exchange1','Exchange2','Exchange3','Yield Potential','Percentage','Buy Recommendation','Sell Recommendation','Status','Transaction','Trend'
						  ].map((elem, key) => {
								return (
								  <th key={key}>
									<div className="table-header">
									  {elem}									  
									  <div>
										<button className="sort-icon sort-asc"></button>
										<button className="sort-icon sort-desc"></button>										  
									  </div>
									</div>
								  </th>
								);
						  })
						}
						<th><div className="table-header">Action</div></th>
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row key={i} uuid={i} token={data.token} exchange1={data.exchange1} exchange2={data.exchange2} exchange3={data.exchange3} potential={data.potential} percentage={data.percentage} buy={data.buy} sell={data.sell} status={data.status} transaction={data.transaction} trend={data.trend} onDelete={this.props.onDelete} />
					  })
					}
				</tbody>
			</table>
  }
}

class Row1 extends React.Component {
  render(){
	return  <tr>
	<Column type='token' placeholder={this.props.token} />
	<Column type='buy_fee' placeholder={this.props.buy_fee} />
	<Column type='transfer_fee' placeholder={this.props.transfer_fee} />
	<Column type='sell_fee' placeholder={this.props.sell_fee} />
	<Column type='buffer_fee' placeholder={this.props.buffer_fee} />
	<Column type='total' placeholder={this.props.total} />
	</tr>
  }
}

class Table1 extends React.Component {
  render(){
	return <table className="table table-bordered">
				<thead>
					<tr>
						{[
							'Token', 'Buy',	'Transfer',	'Sell',	'Buffer', 'Total'
						  ].map((elem, key) => {
								return (
								  <th key={key}>
									<div className="table-header">
									  {elem}									  
									  <div>
										<button className="sort-icon sort-asc"></button>
										<button className="sort-icon sort-desc"></button>										  
									  </div>
									</div>
								  </th>
								);
						  })
						}
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row1 key={i} uuid={i} token={data.token} buy_fee={data.buy_fee} transfer_fee={data.transfer_fee} sell_fee={data.sell_fee} buffer_fee={data.buffer_fee} total={data.total}/>
					  })
					}
				</tbody>
			</table>
  }
}

class Row2 extends React.Component {
  render(){
	return  <tr>
	<Column type='token' placeholder={this.props.token} />
	<UpdateButton type='buy_token' placeholder={this.props.buy_token_input} uuid={this.props.uuid} update={this.props.onUpdate}/>
	<Column type='after_purchase' placeholder={this.props.after_purchase} />
	<Column type='after_transfer' placeholder={this.props.after_transfer} />
	<Column type='trading' placeholder={this.props.trading} />
	<Column type='pair_price' placeholder={this.props.pair_price} />
	<Column type='post_transfer' placeholder={this.props.post_transfer} />
	<Column type='BNB_price' placeholder={this.props.BNB_price} />
	<Column type='BNBs' placeholder={this.props.BNBs} />
	<Column type='token_price' placeholder={this.props.token_price} />
	<Column type='new_tokens' placeholder={this.props.new_tokens} />
	<Column type='increase' placeholder={this.props.increase} />
	</tr>
  }
}

class Table2 extends React.Component {
  render(){
	return <table className="table table-bordered">
				<thead>
					<tr>
						{[
							'Tokens', 'Tokens to buy on lowest priced exchange','Tokens after Purchase','Tokens after Transfer','Trading Pair','Trading Pair Price','Net Post Transfer','BNB Price', 'BNBs', 'Tokens for BNB/Token Price', 'New Tokens', 'Increase/Decrease'
						  ].map((elem, key) => {
								return (
								  <th key={key}>
									<div className="table-header">
									  {elem}
									</div>
								  </th>
								);
						  })
						}
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row2 key={i} uuid={i} token={data.token} buy_token_input={data.buy_token_input} onUpdate={this.props.onUpdate} after_purchase={data.after_purchase} after_transfer={data.after_transfer} trading={data.trading} pair_price={data.pair_price} post_transfer={data.post_transfer} BNB_price={data.BNB_price} BNBs={data.BNBs} token_price={data.token_price} new_tokens={data.new_tokens} increase={data.increase}/>
					  })
					}
				</tbody>
			</table>
  }
}

class Token extends React.Component {
  constructor(props) {
	super(props);
	this.state = { datas: datasByRow, counter: datasByRow.length };
	this.onDelete = this.onDelete.bind(this);
	this.onCreate = this.onCreate.bind(this);
	this.onUpdate = this.onUpdate.bind(this);
  }

  onDelete(id) {
	const data_list = this.state.datas;
	data_list.splice(id, 1);
	this.setState({datas: data_list, counter: data_list.length});
  }
  
  async onUpdate(id, buy_token_input) {
	const data_list = this.state.datas;
	//data_list.splice(id, 1);
	data_list[id].buy_token_input=buy_token_input;
	data_list[id].after_purchase=buy_token_input * (1 - data_list[id].buy_fee/100);
	data_list[id].after_transfer=data_list[id].after_purchase * (1 - data_list[id].sell_fee/100); 
	data_list[id].trading="USDT";
	data_list[id].pair_price=data_list[id].exchange1;
	data_list[id].post_transfer=(data_list[id].after_transfer * data_list[id].pair_price).toFixed(3);
	
	await fetch("https://api.pancakeswap.info/api/tokens/"+data_list[id].token).then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
		}		
		data_list[id].BNB_price = (Number(data.data.price) / Number(data.data.price_BNB)).toFixed(0);
		data_list[id].token_price=(1/Number(data.data.price_BNB)).toFixed(0);
	})
	.catch(error => {
		data_list[id].BNB_price="Did not get"	
	})
	
	data_list[id].BNBs=(data_list[id].post_transfer / data_list[id].BNB_price).toFixed(8);
	data_list[id].new_tokens=(data_list[id].BNBs * data_list[id].token_price).toFixed(2);
	data_list[id].increase=(data_list[id].new_tokens - buy_token_input).toFixed(2);	
	
	this.setState({datas: data_list, counter: data_list.length});
  }
  
  async onCreate(token, exchange1, exchange2, exchange3, potential, percentage, buy, sell, status, transaction, trend, buy_fee, transfer_fee, sell_fee, buffer_fee, total, buy_token_input, after_purchase, after_transfer, trading, pair_price, post_transfer, BNB_price, BNBs, token_price, new_tokens, increase){
	
	await fetch("https://api.pancakeswap.info/api/tokens/"+token).then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
		}
		exchange1= data.data.price.substring(0, 10);	
		const BNB = (Number(data.data.price) / Number(data.data.price_BNB)).toFixed(0)
	})
	.catch(error => {
		exchange1="Token incorrect"	
	})

	await axios.get('http://localhost:8080/exchange2').then( async res => {
			const data = await JSON.parse(res.data).data.tickers[0];
			exchange2 = data.best_ask;
		}).catch(err => {
			console.error(err);
		})
	
	await axios.get('http://localhost:8080/exchange3').then( async res => {
			  const data = await JSON.parse(res.data);
			  exchange3 = data.result.ask;
		}).catch(err => {
			console.error(err);
		})

trackPromise(	
	fetch("https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/"+token+"/market_chart/?vs_currency=usd&days=1").then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;	
		}
		transaction = 0;
		status = 1;
		data["total_volumes"].map(function(object, i){
			transaction = transaction + object[1];
			status = i++;
		})
		transaction = parseInt(transaction / status);
	})
	.catch(error => {
		transaction="Token incorrect"		
	})
)

	await fetch("https://api.coingecko.com/api/v3/simple/price?ids=safemoon&vs_currencies=usd").then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
		}
		potential = data.safemoon.usd;
	})
	.catch(error => {
		this.setState({ errorMessage: error.toString() });
		console.error('There was an error!', error);
	})

	await fetch("https://api.coingecko.com/api/v3/coins/safemoon/market_chart?vs_currency=usd&days=2").then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
		}
		trend = 0;
		status = 1;
		data["prices"].map(function(object, i){
			if (i>24) {	trend = trend + object[1];    status = i++;	}
		})
		status = status - 24;
		trend = trend / status;
	})
	.catch(error => {
		this.setState({ errorMessage: error.toString() });
		console.error('There was an error!', error);
	})
	
	if (trend - potential) {status = "Red"; trend="Negative"} else { status = "Green"; trend="Positive"}	
	
	const max = Math.max(Number(exchange1), exchange2, exchange3);
	const min = Math.min(Number(exchange1), exchange2, exchange3);		
	potential = (max-min).toFixed(8)
	
	percentage = (min/max*100).toFixed(2);
	
	if (max == exchange1) { sell = "Sell E1";
	} else if (max == exchange2){ sell = "Sell E2";
	} else { sell = "Sell E3";
	}
	
	if (min == exchange1) { buy = "Buy E1";
	} else if (max == exchange2){ buy = "Buy E2";
	} else { buy = "Buy E3";
	}	
	
	transfer_fee = sell_fee;
	total = Number(buy_fee) + Number(sell_fee) + Number(transfer_fee) + Number(buffer_fee);
		
    this.setState({datas: this.state.datas.concat([{ token:token, exchange1:exchange1, exchange2:exchange2, exchange3:exchange3, potential:potential, percentage:percentage, buy:buy, sell:sell, status:status, transaction:transaction, trend:trend, buy_fee:buy_fee, sell_fee:sell_fee, transfer_fee:transfer_fee, buffer_fee:buffer_fee, total:total, buy_token_input:buy_token_input, after_purchase:after_purchase, after_transfer:after_transfer, trading:trading, pair_price:pair_price, post_transfer:post_transfer, BNB_price:BNB_price, BNBs:BNBs, token_price:token_price, new_tokens:new_tokens, increase:increase}])})
	
  }

  render(){
	return  <div className="container-fluid exchange small">
				<div className="mb-5">
					<h3>Token</h3>
					<Inputs onCreate={this.onCreate}/>
					<LoadingIndicator/>
					<div>
						<Table datas={this.state.datas} onDelete={this.onDelete} />
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 mb-5">
						<h3>Tax Calculation</h3>					
						<div>
							<Table1 datas={this.state.datas}  />
						</div>
					</div>
				</div>
				<div className="mb-5">
					<h3>Net Calculation</h3>					
					<div>
						<Table2 datas={this.state.datas} onUpdate={this.onUpdate}/>
					</div>
				</div>
			</div>	

  }
}

export default Token;
