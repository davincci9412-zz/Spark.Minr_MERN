import React from 'react';
//import axios from 'axios';
//import { Modal, Button } from 'react-bootstrap';
import { Box } from '@blockstack/ui';
import Address from '../../../assets/images/address-icon.png';
import Delete from '../../../assets/images/delete-icon.png';
//import Bell from '../../../assets/images/blueBell-icon.png';

const datasByRow = [];
const symbolByRow = [];
const tablesByRow = [];
const tokensByRow = [];
const tempsByRow = [];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addressValid: false, chainValid: false, formValid: false, wallet_address:'', history:false, cookieDelete:false, wallet_hash:'', wallet_description:'', wallet_chain:'', token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'',token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      localStorage.setItem("wallet_address", JSON.stringify(symbolByRow));
      this.state.cookieDelete = false;
    } else {
      if (!Array.isArray(JSON.parse(localStorage.getItem("wallet_address")))) {
        localStorage.setItem("wallet_address", JSON.stringify(symbolByRow));
        this.state.cookieDelete = false;
      } else {
        this.state.cookieDelete = true;
      }
    }
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
    this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value, false) });
  }
  handleClick( e) {	  
    this.setState({history:!this.state.history});
  }
  handleAdd( e, wallet_address) {	  
    this.setState({wallet_address: wallet_address})
    this.setState({history:!this.state.history});
    this.validateField('wallet_address', wallet_address, false);
  }
  handleClear() {
	  this.setState({wallet_address:'', history:false, wallet_hash:'', wallet_description:'', wallet_chain:'', addressValid: false,  chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'', token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''});
  }
  
  validateField(fieldName, value, valueExist) {
    if (value.length >=1 ) { valueExist = true; } else {valueExist = false; }
    switch(fieldName) {
      case 'wallet_address':
        this.setState({addressValid: valueExist}, ()=>{
          this.setState({addressValid: valueExist});
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
    this.setState({formValid: this.state.addressValid && this.state.chainValid}, ()=>{
      this.setState({formValid: this.state.addressValid && this.state.chainValid});
    })
  }
    
  render(){
	  return <div className='search-box row '>
      <div className='col-md-3'>
        <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} click={this.handleClick.bind(this)} value={this.state.wallet_address} placeholder='Address' />
        <div id="history_view" className={this.state.history&&this.state.cookieDelete? 'history_view' : 'history_view close'}>
            {    
              JSON.parse(localStorage.getItem("wallet_address")).reverse().map((data, i) => {
                return <History key={i} uuid={i} data={data} history={this.state.history}  add={this.handleAdd.bind(this, data)}/>
              })
            }
        </div>
      </div>	  
      <div className='col-md-2'><Input0 name='wallet_hash' change={this.handleChange.bind(this, 'wallet_hash')} value={this.state.wallet_hash} placeholder='Name' /></div>	  
      <div className='col-md-4'><Input0 name='wallet_description' change={this.handleChange.bind(this, 'wallet_description')} value={this.state.wallet_description} placeholder='Description' /></div>
      <div className='col-md-2'><Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Select Chain' /></div>
      <div className='col-md-1'><AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/></div>	  
    </div>
  }
}
class History extends React.Component {
	onClick() {
	  this.props.add.call(this, this.props.data);   
	}	
	render(){
		return <div className="cursor item" onClick={this.onClick.bind(this)} >{this.props.data}</div>
	}
}
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  render(){
    return  <input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} onClick={this.props.click} autoComplete="off" value={this.props.value} className='form-control'/>
  }  
}
class Input0 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  render(){
    return  <input type='text' name={this.props.name} placeholder={this.props.placeholder} autoComplete="off" onChange={this.props.change} value={this.props.value} className='form-control'/>
  }  
}

class Select extends React.Component {
  constructor(props) {
	super(props);
	  this.state = { value: this.props.value };
  }
  render(){
	return <select type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="">Select Chain</option>	 
        <option value="1">BSC chain</option>	 
        <option value="2">ETH chain</option> 
      </select>
  }
}
class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}	
	render(){
		return <div className="td medium">
		  <div className="cursor text-center" onClick={this.onClick.bind(this)} autoComplete="off" ><img src={Delete} alt="Delete"/></div>
		</div> 
	}
}
/*
class RenameButton extends React.Component {
	render(){
		return <div className="td">
		  <div className="cursor "><ModalWindow index={this.props.uuid} old_description= {this.props.old_description} state={this.props.state} rename={this.props.onRename}/></div>
		</div> 
	}
}

class NotificationButton extends React.Component {
	onClick() {
	  this.props.notification.call(null, this.props.uuid);
	}	
	render(){
		return <div className="td half">
		  <div className="cursor text-center" ><img src={Bell} alt="Notification"/></div>
		</div> 
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
		return <div className="td"><div className="input-group"><input type='text' name="buy_token_input" onChange={this.handleChange.bind(this, 'buy_token_input')} value={this.props.value} className='form-control' /><button type="button" className="input-group-postpend btn btn-success" onClick={this.onClick.bind(this)}>Go</button></div></div> 		
	}
}
*/
class AddButton extends React.Component {
	onClick(){
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      this.props.newData.temp1 = [];
    } else {
      this.props.newData.temp1 = JSON.parse(localStorage.getItem("wallet_address"))
    }
    this.props.newData.temp1.map((data, i)=>{
      if (data === this.props.newData.wallet_address) this.props.newData.temp2 = "duplicate"
      return this.state;
    })
    if (this.props.newData.temp2 !== "duplicate") this.props.newData.temp1.push(this.props.newData.wallet_address);
    localStorage.setItem("wallet_address", JSON.stringify(this.props.newData.temp1));
	  this.props.newData.temp1 = this.props.newData.temp2 = ""
    this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_hash, this.props.newData.wallet_description, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.tokens, this.props.newData.temps, this.props.newData.transaction_wallet, this.props.newData.transaction_crypto, this.props.newData.transaction_date,this.props.newData.transaction_qty, this.props.newData.transaction_amount, this.props.newData.transaction_opponent, this.props.newData.transaction_orientation, this.props.newData.transaction_token, this.props.newData.transaction_price, this.props.newData.trend, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
    this.props.clear.call(null);
	}
	render(){
		return <button type="button" style={{ "width": "100%" }} className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled}>Add</button>
	}
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copySuccess: '' }
  }
  onChange(){ 
  }
  copyToClipboard = (e) => {
    this.inputAddress.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };
  render(){
    if (this.props.type === "gear"){
      return <div className="td no"><Box className="address" as="img" src={Address} alt="Address" ></Box></div>  
    } else if (this.props.type === "wallet_address"){
      return <div className="td long1"><div className="addressCopy hash">
                <input type="text" ref={(input) => this.inputAddress = input} className="form-control" value={this.props.placeholder} onChange={this.onChange.bind(this)} readOnly/>
                <span className="fa fa-clone cursor" onClick={this.copyToClipboard}></span>{this.state.copySuccess}
              </div>
            </div>  
    } else if (this.props.type === "wallet_description"){
      return <div className="td long2">{this.props.placeholder}</div>  
    } else if (this.props.type === "transaction_from" || this.props.type === "transaction_to"){
      if (this.props.fullwidth ==="1"){
        return <div className="td long"><div className="addressCopy hash">
                <input type="text" ref={(input) => this.inputAddress = input} className="form-control" value={this.props.placeholder} onChange={this.onChange.bind(this)} readOnly/>
                <span className="fa fa-clone cursor" onClick={this.copyToClipboard}></span>{this.state.copySuccess}
              </div>
            </div>  
      } else {
        return <div className="td medium">{this.props.placeholder.substring(0, 10).concat("...")}</div>  
      }
    } else if (this.props.type === "transaction_qty"){
      if (this.props.orientation) {
        return <div className="td"><span className="text-danger">-{this.props.placeholder}</span></div>  
      } else {
        return <div className="td"><span >{this.props.placeholder}</span></div>  
      }
    } else if (this.props.type === "transaction_amount"){
      return <div className="td"><span>${this.props.placeholder}</span></div> 
    } else if (this.props.type === "transaction_token" || this.props.type === "transaction_date"){
      return <div className="td medium"><span>{this.props.placeholder}</span></div> 
    } else {
      return <div className="td">{this.props.placeholder}</div>  
    }	
  }
}

class Row extends React.Component {
  render(){
    return  <div className="tr">
	    <Column type='gear' placeholder={this.props.wallet_address} />
      <Column type='wallet_address' placeholder={this.props.wallet_address} />
      <Column type='wallet_description' placeholder={this.props.wallet_description} />
      {/*<NotificationButton uuid={this.props.uuid} notification={this.props.onNotification} />*/}
      <DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
    </div>
  }
}

/*<RenameButton uuid={this.props.uuid} onRename={this.props.onRename} old_description={this.props.wallet_description} state={this.props.datas}/>*/

class Table extends React.Component {
  render(){
	return <div className="">
		<div className="wallet-header mb-4">
			<h4 className="mb-4">Addresses Tracked</h4> 
			{/*<h5 className="transaction cursor">Show All Address ID</h5>*/}
		</div>
        <div className="table one">
            <div className="tr thead">
			        <div className="td table-header no" ></div>
              <div className="td table-header long1" >ADDRESS</div>
              <div className="td table-header long2" >DESCRIPTION</div>
              <div className="td table-header medium no"></div>
            </div>
            {
              this.props.datas.map((data, i) => {
              return <Row key={i} uuid={i} datas={this.props.datas} wallet_address={data.wallet_address} wallet_hash={data.wallet_hash} wallet_description={data.wallet_description} tables={data.tables} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
              })
            }
        </div>
        {
            this.props.datas.map((data, i) => {
              if (data.tables !== undefined){
                return <Section key={i} uuid={i} sections = {data.tables} name={data.wallet_hash} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
              } else {
                return false;
              }
              
            })
        }
      </div>
      
  }
}

class Row1 extends React.Component {
  render(){
	return  <div className="table">
      <div className="tr">
        <Column type='transaction_token' placeholder={this.props.transaction_token} />
        <Column type='transaction_from' placeholder={this.props.transaction_from} />
        <Column type='transaction_to' placeholder={this.props.transaction_to} />
        <Column type='transaction_date' placeholder={this.props.transaction_date} />
        <Column type='transaction_qty' placeholder={this.props.transaction_qty} orientation={this.props.transaction_orientation}/>
        <Column type='transaction_amount' placeholder={this.props.transaction_amount} />
        <Column type='transaction_balance' placeholder={this.props.transaction_balance} />
      </div>
      <div className="tr no-display">
      <Column type='transaction_from' placeholder={this.props.transaction_from} fullwidth="1"/>
      <Column type='transaction_to' placeholder={this.props.transaction_to} fullwidth="1"/>
    </div>
  </div>
  }
}
class Section extends React.Component{
  render(){
    return <div className="transaction-section hide">
	  <div className="wallet-header mb-4">
			<h4 className="mb-4">Transaction Log for Address{(this.props.name)?[this.props.name]:""} Tracked</h4> 
			<h5 className="transaction cursor"  onClick={showClick}><span className="address-show">Show All Address ID</span><span className="address-hide">Hide All Address ID</span></h5>
	  </div>
	  <div className="table two">
          <div className="tr thead">
            <div className="td table-header medium">TOKEN</div>
            <div className="td table-header medium">FROM</div>
            <div className="td table-header medium">TO</div>
            <div className="td table-header medium">AGE</div>
            <div className="td table-header">QTY</div>
            <div className="td table-header">AMOUNT</div>
            <div className="td table-header">QTY OF TOKEN</div>
          </div>
          {
            this.props.sections.map((data1, j) => {
              return <Row1 key={j} uuid={j} transaction_token={data1.transaction_token} transaction_from={data1.transaction_from} transaction_to={data1.transaction_to} transaction_date={data1.transaction_date} transaction_qty={data1.transaction_qty} transaction_orientation={data1.transaction_orientation} transaction_amount={data1.transaction_amount} transaction_balance={data1.transaction_balance}  />
            })
          }       
      </div>
    </div>
  }
}

/*
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
    this.props.state[this.props.index].wallet_description = this.state.new_description;
    this.setState({show:false});
	  this.props.rename.call(null, this.props.state);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  } 
  
  render (){
    return <span><span variant="primary" onClick={this.handleShow} className="underline">Change description</span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Current Description: </label>
          <input type='text' className='form-control' value={this.props.old_description} placeholder='Description'  readOnly/>
        </div>
        <div className="form-group">
          <label>New Description: </label>
          <input type='text' name='new_description' value={this.state.name} onChange={this.handleChange.bind(this, 'new_description')} className='form-control' placeholder='New Description' />
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
*/
class Loading extends React.Component {
  render(){
    if (this.props.loading) {
      return <div className="justify-content-center navbar mb-3"><img width="100" height="100" src="/2.gif" alt="Please wait for loading"/></div>
    } else {
      return <div></div>
    }
  }
}

class WalletsTracked extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datas:datasByRow, symbols:symbolByRow, tables:tablesByRow, tokens:tokensByRow, temps:tempsByRow, loading:false};
    this.onDelete = this.onDelete.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({datas: data_list});
  }
  
  onRename(data_list) {
    this.setState({datas: data_list});
  }

  async onUpdate(id, buy_token_input) {
	
  }
  
  async onRefresh(id, transaction, status, trend){
	
  }
   

  async onCreate(wallet_address, wallet_hash, wallet_description, wallet_chain, tables, tokens, temps, token_list, transaction_token, transaction_from, transaction_to, transaction_date, transaction_qty, transaction_orientation, transaction_amount, transaction_balance, transaction_price, trend, chain, temp1, temp2, temp3, url1, url2, url3, url4, url5, url6, days, hours, minutes){
	  this.setState({loading : true})
    tokens = tables = temps = token_list = [];
    if (token_list.length>0){

    }
    wallet_address = wallet_address.trim().toLowerCase();
    switch(wallet_chain) {
      case '1':
        url1 = 'https://api.bscscan.com/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        url2 = 'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        url3 = 'https://api.bscscan.com/api?module=account&action=txlist&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        url4 = 'https://api.bscscan.com/api?module=account&action=tokentx&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        chain = 'binancecoin'
        transaction_token = 'BNB'
        break;
	    case '2':
        url1 = 'https://api.etherscan.io/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        url2 = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        url3 = 'https://api.etherscan.io/api?module=account&action=txlist&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        url4 = 'https://api.etherscan.io/api?module=account&action=tokentx&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        chain = 'ethereum'
        transaction_token = 'ETH'
        break;
      default:
        break;
    }
    await fetch(url1).then(async response => {
      const data = await response.json();
      (data.message === "OK")? transaction_balance = (Number(data.result)/1000000000000000000).toFixed(10).replace(/0+$/, ""): transaction_balance = "Invalid Wallet";
      return this.state;
    })
    .catch(error => {
      transaction_qty="Invalid Wallet"	
    })
    await fetch(url2).then(async response => {
      const data = await response.json();
      if (data.message === "OK"){
        transaction_price = Number(data.result.ethusd).toFixed(2);
      } else{
        transaction_price = "Invalid Wallet";
      } 
    })
    .catch(error => {
      transaction_price = "Invalid Wallet"	
    })

    await fetch(url3).then(async response => {
      const data1 = await response.json();
      if (data1.message === "OK"){
        if (data1.result.length >= 1) {
          data1.result.map((data, i) => {
              temp2 = (Number(data.value)/1000000000000000000).toFixed(10).replace(/0+$/, "")
              temp3 = Math.floor(Date.now()/1000) - Number(data.timeStamp)
              //temp3 = new Date(data.timeStamp * 1000).toISOString().slice(0,10);
              days = Math.floor(temp3/60/60/24);
              hours = Math.floor(temp3/60/60- days*24);
              minutes = Math.floor(temp3/60- days*24 - hours*60);
              if (days === 0){
                temp3 = hours +" h " + minutes + " m"
              } else {
                temp3 = days +" d " + hours + " h"
              }
              if (data.from === wallet_address){
                transaction_orientation = true;
              } else {
                transaction_orientation = false;                
              }
              tables = tables.concat([{ blockNumber:data.blockNumber, transaction_token: transaction_token, transaction_from: data.from, transaction_to:data.to, transaction_date:temp3, transaction_qty:temp2, transaction_orientation:transaction_orientation, transaction_amount:(Number(temp2) * Number(transaction_price)).toFixed(10), transaction_price:transaction_price, transaction_balance:transaction_balance}]);
            return this.state;
          })
        }
      } 
    })
    .catch(error => {
      //temp1="Transaction is not existed"	
    })
    await fetch(url4).then(async response => {
      const data1 = await response.json();
      if (data1.message === "OK"){
        if (data1.result.length >= 1) {
          data1.result.map((data, i) => {
              temp1 = 10**data.tokenDecimal;
              temp2 = (Number(data.value)/temp1).toFixed(10).replace(/0+$/, "")
              //temp2 = (Number(data.value)/temp1).toFixed(8).replace(/0+$/, "").replace(/.\s*$/, "") 
              temp3 = Math.floor(Date.now()/1000) - Number(data.timeStamp)
              //temp3 = new Date(data.timeStamp * 1000).toISOString().slice(0,10);
              days = Math.floor(temp3/60/60/24);
              hours = Math.floor(temp3/60/60- days*24);
              minutes = Math.floor(temp3/60- days*24 - hours*60);
              if (days === 0){
                temp3 = hours +" h " + minutes + " m"
              } else {
                temp3 = days +" d " + hours + " h"
              }
              if (data.from === wallet_address){
                transaction_orientation = true;
              } else {
                transaction_orientation = false;                
              }
              tokens = tokens.concat([{ blockNumber:data.blockNumber, contractAddress:data.contractAddress, transaction_decimal:data.tokenDecimal, transaction_token: data.tokenSymbol, transaction_from: data.from, transaction_to:data.to, transaction_date:temp3, transaction_qty:temp2, transaction_orientation:transaction_orientation, transaction_amount:(Number(temp2) * Number(transaction_price)).toFixed(10), transaction_price:transaction_price, transaction_balance:transaction_balance}]);
              return this.state;
          })
          token_list = [...new Map(tokens.map(item => [item["transaction_token"], item])).values()]
        }
      } 
    })
    .catch(error => {
      //temp1="Transaction is not existed"	
    })

    if (token_list.length > 0) {
      token_list.map((data, i) => {
        switch(wallet_chain) {
          case '1':
            token_list[i].token_balance_url = 'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress='+data.contractAddress+'&address='+wallet_address+'&tag=latest&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
            token_list[i].token_price_url = 'https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress='+data.contractAddress+'&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
            break;
          case '2':
            token_list[i].token_balance_url = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+data.contractAddress+'&address='+wallet_address+'&tag=latest&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
            token_list[i].token_price_url = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+temp1+'&address='+wallet_address+'&tag=latest&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
            break;
          default:
            break;
        }
        return this.state;
      })

      await Promise.all(token_list.map(async(data, i)=>  {
          await fetch(data.token_balance_url).then(async response => {
            const data1 = await response.json();
            temp1 = 10** data.transaction_decimal;
            (data1.message === "OK")? token_list[i].transaction_balance = (Number(data1.result)/temp1).toFixed(10).replace(/0+$/, "") : token_list[i].transaction_balance = "Invalid Wallet";
            return this.state;
          })
          .catch(error => {
            token_list[i].transaction_balance="Invalid Wallet"	
          })
        })
      )

      await Promise.all(token_list.map(async(data, i)=>  {
        //await setTimeout( this.subquery.call(null, token_list, data, i),1000); 
        sleep(600);
          await fetch(data.token_price_url).then(async response => {
            const data1 = await response.json();
            (data1.message === "OK")? token_list[i].transaction_price = data1.result[0].tokenPriceUSD : token_list[i].transaction_price = "Invalid Wallet";
            return this.state;
          })
          .catch(error => {
            token_list[i].transaction_price="Invalid Wallet"	
          }) 
        })
      )
      // temp3 =0;
      // temp2 = tokens.length;
      // tables.map((table, i)=>{
      //   temp1 = true;
      //   tokens.map((token, j)=>{          
      //     if(Number(table.blockNumber) >= Number(token.blockNumber)){
      //       temps[temp3] = table;
      //       temp1 = false;
      //       temp3++;
      //     } else if(Number(table.blockNumber === Number(token.blockNumber))) {
      //       temps[temp3] = { blockNumber:token.blockNumber, transaction_token: token.transaction_token, transaction_from: token.transaction_from, transaction_to:token.transaction_to, transaction_date:token.transaction_date, transaction_qty:token.transaction_qty, transaction_orientation:token.transaction_orientation, transaction_amount:(Number(token.transaction_qty) * Number(token.transaction_price))..toFixed(10), transaction_price:token.transaction_price, transaction_balance:token.transaction_balance}
      //       temp1 = false;
      //       temp3++;
      //     } else if ((Number(temp2)-1) == j && temp1){
      //       temps[temp3] = { blockNumber:token.blockNumber, transaction_token: token.transaction_token, transaction_from: token.transaction_from, transaction_to:token.transaction_to, transaction_date:token.transaction_date, transaction_qty:token.transaction_qty, transaction_orientation:token.transaction_orientation, transaction_amount:(Number(token.transaction_qty) * Number(token.transaction_price))..toFixed(10), transaction_price:token.transaction_price, transaction_balance:token.transaction_balance}
      //       temp3++;
      //     }
      //   })

      // })
      tokens.map((token, j)=>{     
        token_list.map((data, i)=>{    
          if (token.transaction_token === data.transaction_token) {
            temps[j] = { blockNumber:token.blockNumber, transaction_token: token.transaction_token, transaction_from: token.transaction_from, transaction_to:token.transaction_to, transaction_date:token.transaction_date, transaction_qty:token.transaction_qty, transaction_orientation:token.transaction_orientation, transaction_amount:(Number(token.transaction_qty) * Number(data.transaction_price)).toFixed(10), transaction_price:token.transaction_price, transaction_balance:data.transaction_balance}
          }
          return this.state.temps;
        }) 
        return this.state.temps;
      })
      tables = tables.concat(temps);
    }



    this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address.trim().toLowerCase(), wallet_hash:wallet_hash, wallet_description:wallet_description, wallet_chain:wallet_chain, tables:tables}])})
    this.setState({loading : false})

  }

  render(){
    return  <div className="exchange wallet tracker">
          <div className="top-bar">
            <h3 className="page-title">Address Tracker</h3>
            <button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
          </div>
          <div className="container-fluid small" datas={this.state.datas} >
            <div className="mb-5">
              <h4>Add new address</h4>
              <Inputs onCreate={this.onCreate}/>
              <Loading loading={this.state.loading}/>
              <Table datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} />
            </div>				
          </div>
        </div>
        
  }
}
	
export default WalletsTracked;  

function showClick(){
	const menu = document.getElementsByClassName("transaction-section")[0];
	if (menu.classList.contains("hide")) {
		menu.classList.remove("hide");
	} else {
		menu.className += " hide";
	}	  
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// function arrayUnique(array) {
//   const a = array.concat();
//   a.map((data, i)=>{
//     a.map((data1,j)=>{
//       if(a[i].blockNumber===a[j].blockNumber) a.splice(j--, 1)
//     })
//   })
//   return a;
// }
