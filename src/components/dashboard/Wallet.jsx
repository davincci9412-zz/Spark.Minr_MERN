import React from 'react';
//import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const datasByRow = [];
const tablesByRow = [];
const symbolByRow = [
	{qty: ' ', token_value: 'PAX' , token_average: 'PAX'}]

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addressValid: false,  nameValid: false, chainValid: false,  formValid: false, wallet_address:'', wallet_name:'', wallet_chain:'', token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'',token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
    this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value, false) });
  }
  handleClear() {
	  this.setState({wallet_address:'', wallet_name:'', wallet_chain:'', addressValid: false,  nameValid: false, chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'', token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''});
  }
  
  validateField(fieldName, value, valueExist) {
    if (value.length >=1 ) { valueExist = true; } else {valueExist = false; }
    switch(fieldName) {
      case 'wallet_address':
        this.setState({addressValid: valueExist}, ()=>{
          this.setState({addressValid: valueExist});
        })
        break;
      case 'wallet_name':
        this.setState({nameValid: valueExist}, ()=>{
          this.setState({nameValid: valueExist});
        })
        break;   
      case 'wallet_chain':
        this.setState({chainValid: valueExist}, ()=>{
          this.setState({chainValid: valueExist});
        })
        break;        
      default:
        break;
    }
    this.setState({formValid: this.state.addressValid && this.state.nameValid && this.state.chainValid}, ()=>{
      this.setState({formValid: this.state.addressValid && this.state.nameValid && this.state.chainValid});
    })
  }
    
  render(){
	return  <div className='row mb-5'>
	  <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} value={this.state.wallet_address} placeholder='Wallet Address' />
	  <Input0 name='wallet_name' change={this.handleChange.bind(this, 'wallet_name')} value={this.state.wallet_name} placeholder='Wallet Name' />
    <Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Wallet Chain' />
	  <div className='col-md-1'><AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/></div>	  
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
	return <div className='col-md-2'>
			<input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'/>		 
	</div>
  }
}

class Select extends React.Component {
  constructor(props) {
	super(props);
	  this.state = { value: this.props.value };
  }
  render(){
	return <div className='col-md-2'>
			<select type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="">Select Wallet Chain</option>	 
        <option value="1">BSC chain</option>	 
        <option value="2">ETH chain</option> 
      </select>
	</div>
  }
}

class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}	
	render(){
		return <div className="cursor fa fa-remove remove"><span onClick={this.onClick.bind(this)}>Remove</span></div>
	}
}
class RenameButton extends React.Component {
	onClick() {
	  this.props.rename.call(null, this.props.uuid);
	}	
	render(){
		return <div className="cursor fa fa-pencil-square-o remove"><ModalWindow index={this.props.uuid} old_name= {this.props.name} state={this.props.state} rename={this.props.onRename}/></div>
	}
}

class AddButton extends React.Component {
	onClick(){
	  this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_name, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.token, this.props.newData.qty, this.props.newData.token_value,this.props.newData.token_average, this.props.newData.token_price, this.props.newData.token_change, this.props.newData.token_position, this.props.newData.trend, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
    this.props.clear.call(null);
	}
	render(){
		return <button type="button" style={{ "width": "100%" }} className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled}>Add</button>
	}
}

class Column extends React.Component {
  render(){
    if (this.props.type === "token"){
      if (this.props.trend === "negative"){
        return <td><span className="fa fa-circle danger"></span>&nbsp;{this.props.placeholder}</td> 
      } else if (this.props.trend === "positive"){
        return <td><span className="fa fa-circle success"></span>&nbsp;{this.props.placeholder}</td> 
      }
    } else if (this.props.type === "token_value" || this.props.type === "token_average" || this.props.type === "token_price" ){
      return <td>$ {this.props.placeholder}</td> 
    } else if (this.props.type === "token_position"){
      if (this.props.trend === "negative"){
        return <td className="text-center"><span className="fa fa-minus-square-o"></span></td> 
      } else {
        return <td className="text-center"><span className="fa fa-plus-square-o"></span></td> 
      }      
    } else if (this.props.type === "token_change"){
      if (this.props.trend === "negative"){
        return <td className="text-center"><span className="btn btn-danger">{this.props.placeholder}%</span></td> 
      } else if (this.props.trend === "positive"){
        return <td className="text-center"><span className="btn btn-success">{this.props.placeholder}%</span></td> 
      }
    } else {
      return <td>{this.props.placeholder}</td> 
    }	
  }
}

class Row extends React.Component {
  render(){
	return  <tr>
    <Column type='token' placeholder={this.props.token} trend={this.props.trend} />
    <Column type='qty' placeholder={this.props.qty} />
    <Column type='token_value' placeholder={this.props.token_value} />
    <Column type='token_average' placeholder={this.props.token_average} />
    <Column type='token_price' placeholder={this.props.token_price} />
    <Column type='token_change' placeholder={this.props.token_change} trend={this.props.trend} />
    <Column type='token_position' placeholder={this.props.token_position} trend={this.props.trend} />
	</tr>
  }
}

class Table extends React.Component {
  render(){
	return <table className="table table-bordered">
				<thead>
					<tr>
						{[
							'Token','QTY','Value','Average acquisition price','Price','24h change','Expand positions'
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
					  this.props.tables.map((data, i) => {
						  return <Row key={i} uuid={i} token={data.token} qty={data.qty} token_value={data.token_value} token_average={data.token_average} token_price={data.token_price} token_change={data.token_change} token_position={data.token_position} trend={data.trend} chain={data.chain} temp1={data.temp1} temp2={data.temp2} temp3={data.temp3} />
					  })
					}
				</tbody>
			</table>
  }
}

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tables: datasByRow, counter: datasByRow.length};
  }
  render(){
    return <div>
      {
        this.props.datas.map((data, i) => {
          return <div key={i} uuid={i} className="row mx-0 mb-4">
                <h4>{data.wallet_name}</h4>
                <DeleteButton uuid={i} delete={this.props.onDelete} />
                <RenameButton uuid={i} name={data.wallet_name} state={this.props.datas} onRename={this.props.onRename}/>
                <Table tables={data.tables}/>
            </div>
        })
      } 
    </div>
  }
}
class Loading extends React.Component {
  render(){
	if (this.props.loading) {
		return <div className="justify-content-center navbar mb-3"><img width="100" height="100" src="/2.gif" alt="Please wait for loading"/></div>
	} else {
		return <div></div>
	}
  }
}

class ModalWindow extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {datas:this.props.state, show: false};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});
  handleSave = () => {
    this.props.state[this.props.index].wallet_name = this.state.new_name;
    this.setState({show:false});
	  this.props.rename.call(null, this.props.state);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  } 
  
  render (){
    return <span><span variant="primary" onClick={this.handleShow}>Rename</span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename your wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Current Name: </label>
          <input type='text' className='form-control' value={this.props.old_name} placeholder='Name'  readOnly/>
        </div>
        <div className="form-group">
          <label>New Name: </label>
          <input type='text' name='new_name' value={this.state.name} onChange={this.handleChange.bind(this, 'new_name')} className='form-control' placeholder='New Name' />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  }
}

class Wallet extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow, counter: datasByRow.length, tables: tablesByRow, tables_counter: tablesByRow.length, symbols: symbolByRow, symbol_counter: symbolByRow.length, loading:false};
    this.onDelete = this.onDelete.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({datas: data_list, counter: data_list.length});
  }

  onRename(data_list) {
    this.setState({datas: data_list, counter: data_list.length});
  }
  
  async onUpdate(id, buy_token_input) {
    const data_list = this.state.datas;
    //data_list.splice(id, 1);
    data_list[id].buy_token_input=buy_token_input;
    data_list[id].after_purchase=buy_token_input * (1 - data_list[id].wallet_name/100);
    data_list[id].trading="USDT";
    data_list[id].pair_price=data_list[id].qty;
    data_list[id].post_transfer=(data_list[id].after_transfer * data_list[id].pair_price).toFixed(3);
    
    await fetch("https://api.pancakeswap.info/api/tokens/"+data_list[id].token).then(async response => {
      const data = await response.json();
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
  
  async onRefresh(id, token_position, status, trend, chain, temp1, temp2, temp3){
    
  }
  
  async onCreate(wallet_address, wallet_name, wallet_chain, tables, token, qty, token_value, token_average, token_price, token_change, token_position, trend, chain, temp1, temp2, temp3){
    this.setState({loading : true})
    
    switch(wallet_chain) {
      case '1':
        temp1 = 'DV5UTGPGHM6Y79Y9EBMQ554FJWSFS579EU'
        temp2 = 'https://api.bscscan.com/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey='+ temp1
        temp3 = 'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey='+ temp1
        chain = 'binancecoin'
        token = 'BNB'
        break;
	    case '2':
        temp1 = 'WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        temp2 = 'https://api.etherscan.io/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey='+ temp1
        temp3 = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey='+ temp1
        chain = 'ethereum'
        token = 'ETH'
        break;
      case '3':
        temp1 = 'DV5UTGPGHM6Y79Y9EBMQ554FJWSFS579EU'
        break;
      case '4':
        temp1 = 'DV5UTGPGHM6Y79Y9EBMQ554FJWSFS579EU'
        break;
      default:
        break;
    }
    
    await fetch(temp2).then(async response => {
      const data = await response.json();
      (data.message === "OK")? qty = (Number(data.result)/1000000000000000000).toFixed(10) : qty = "Invalid Wallet";
      return this.state;
    })
    .catch(error => {
      qty="Invalid Wallet"	
    })

    await fetch(temp3).then(async response => {
      const data = await response.json();
      if (data.message === "OK"){
        token_price = data.result.ethusd;
        token_value =(Number(qty) * Number(token_price)).toFixed(2) ;
      } else{
        token_price = token_value = "Invalid Wallet";
      } 
      return this.state;
    })
    .catch(error => {
      token_price = token_value="Invalid Wallet"	
    })

    await fetch("https://api.coingecko.com/api/v3/coins/"+chain+"/market_chart?vs_currency=usd&days=2").then(async response => {
      const data = await response.json();
      token_change = 0;
      data["prices"].map(function(object, i){
        if (i===23) {	
          token_change = token_change + object[1]; 
        }
        return token_change;
      })     
      token_change = ((token_price - token_change)/token_change * 100 ).toFixed(2);    
      (token_change >= 0 ) ? trend="positive": trend="negative";      
    })
    .catch(error => {
      token_change="Invalid Wallet"	
    })

    // await axios.get(process.env.REACT_APP_SERVER_URL+'/exchange2', { params : { symbol: exchange2_symbol}}).then( async res => {
		// 	const data = await JSON.parse(res.data).data.tickers[0];
		// 	exchange2 = data.best_ask;
		// }).catch(err => {
		// 	console.error(err);
		// })
    
    token_average = token_price;
    tables = this.state.tables.concat([{ token:token, qty:qty, token_value:token_value, token_average:token_average, token_price:token_price, token_change:token_change, token_position:token_position, trend:trend, chain:chain, temp1:temp1, temp2:temp2, temp3:temp3}])
    this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address, wallet_name:wallet_name, wallet_chain:wallet_chain, tables:tables}])})
	
	  this.setState({loading : false})
  }

  render(){
	return  <div className="exchange wallet">
				<div className="top-bar">
					<h3 className="page-title">My Wallet</h3>
					<button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
				</div>
				<div className="container-fluid small" datas={this.state.datas} >
					<div className="mb-5">
						<h4>Add my wallet</h4>
						<Inputs onCreate={this.onCreate}/>
						<Loading loading={this.state.loading}/>
            <Group datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} />  
					</div>					
				</div>
			</div>
      
  }
}
	
export default Wallet;




