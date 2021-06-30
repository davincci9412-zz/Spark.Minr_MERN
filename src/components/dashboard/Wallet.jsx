import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Poo from '../../assets/images/poo-icon.png';
import { Box } from '@blockstack/ui';

const datasByRow = [];
const tablesByRow = [];
const symbolByRow = []

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addressValid: false,  chainValid: false,  formValid: false, wallet_address:'', history:false, cookieDelete:false, wallet_name:'', wallet_chain:'', token:'', qty:'', token_value:'', token_price:'', token_average:'', token_acquire:'', token_change:'', token_rol:'',token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''};
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
	  this.setState({wallet_address:'', history:false, wallet_name:'', wallet_chain:'', addressValid: false,  chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_price:'', token_average:'', token_acquire:'', token_change:'', token_rol:'', token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''});
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
	  return  <div className='search-box row'>
            <div className = 'col-md-7'>
              <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} click={this.handleClick.bind(this)} value={this.state.wallet_address} placeholder='Address' />
              <div id="history_view" className={this.state.history&&this.state.cookieDelete? 'history_view' : 'history_view close'}>
                  {                      
                    JSON.parse(localStorage.getItem("wallet_address")).reverse().map((data, i) => {
                      return <History key={i} uuid={i} data={data} history={this.state.history}  add={this.handleAdd.bind(this, data)}/>
                    })
                  }
              </div>
            </div>          
            <div className='col-md-3'>
              <Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Select Address Chain' />
            </div>
            <div className='col-md-2 text-right'>
              <AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/>
            </div>	  
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
	return <input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} onClick={this.props.click} autoComplete="off" value={this.props.value} className='form-control'/>
  }
}
class Select extends React.Component {
  constructor(props) {
	super(props);
	  this.state = { value: this.props.value };
  }
  render(){
	return <select type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="">Select Address Chain</option>	 
        <option value="1">BSC chain</option>	 
        <option value="2">ETH chain</option> 
      </select>
  }
}

// class DeleteButton extends React.Component {
// 	onClick() {
// 	  this.props.delete.call(null, this.props.uuid);
// 	}	
// 	render(){
// 		return <div className="cursor fa fa-remove remove"><span onClick={this.onClick.bind(this)}>Remove</span></div>
// 	}
// }

class ShowButton extends React.Component {
	onClick() {
	  this.props.onShow.call(null, this.props.uuid, this.props.show);
	}	
	render(){
		return <div onClick={this.onClick.bind(this)}>{(this.props.show)?<span className="address-show">Show All Positions</span>:<span className="address-hide">Hide All Positions</span> }</div>
	}
}

class RenameButton extends React.Component {
	onClick() {
	  this.props.rename.call(null, this.props.uuid);
	}	
	render(){
		return <span><ModalWindow index={this.props.uuid} old_name= {this.props.name} state={this.props.state} rename={this.props.onRename}/></span>
	}
}

class AddButton extends React.Component {
	onClick(){    
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      this.props.newData.temp1 = [];
    } else {
      this.props.newData.temp1 = JSON.parse(localStorage.getItem("wallet_address"))
    }
    this.props.newData.temp1.map((data, i)=>{
      if (data === this.props.newData.wallet_address) this.props.newData.temp2 = "duplicate"
      return this.props.newData.temp2;
    })
    if (this.props.newData.temp2 !== "duplicate") this.props.newData.temp1.push(this.props.newData.wallet_address);
    localStorage.setItem("wallet_address", JSON.stringify(this.props.newData.temp1));
    this.props.newData.temp1 = this.props.newData.temp2 = '';
    this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_name, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.token, this.props.newData.qty, this.props.newData.token_value,this.props.newData.token_average, this.props.newData.token_price, this.props.newData.token_change, this.props.newData.token_position, this.props.newData.trend, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
    this.props.clear.call(null);
	}
	render(){
		return <input type="submit" className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled} value="Add"/>
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
    if (this.props.type === "token"){
      return <div className="td">{this.props.placeholder}</div> 
    } else if (this.props.type === "token_value" || this.props.type === "token_price" || this.props.type === "token_average" || this.props.type === "token_acquire"){
      return <div className="td">${this.props.placeholder}</div> 
    } else if (this.props.type === "token_change"){
      if (this.props.trend === "negative"){
        return <div className="td"><div className="change"><span className="red-arrow sort-icon"></span><span className="text-danger"> {this.props.placeholder}%</span></div></div> 
      } else {
        return <div className="td"><div className="change"><span className="green-arrow sort-icon"></span><span className="text-success"> {this.props.placeholder}%</span></div></div> 
      }
    } else if (this.props.type === "token_rol"){
      if (this.props.placeholder === "NaN") {
        return <div className="td small text-danger">Zero Devision</div> 
      } else {
        return <div className="td small">{this.props.placeholder}%</div> 
      }
    } else if (this.props.type === "token_position"){      
      return <div className="td small"><a href={this.props.placeholder} className="cursor" target="_blank" rel="noreferrer"><Box className="poo-icon cursor" as="img" src={Poo} alt="Price Graph" ></Box></a></div> 
    } else {
      return <div className="td">{this.props.placeholder}</div> 
    }	
  }
}

class Row1 extends React.Component {
  render(){
	return  <div className="tr opacity-05">
            <Column type='timeStamp' placeholder={this.props.timeStamp}/>
            <Column type='qty' placeholder={this.props.qty} />
            <Column type='token_value' placeholder={this.props.token_value} />
            <Column type='token_price' placeholder={this.props.token_price} />
            <Column type='token_average' placeholder={this.props.token_average} />
            <Column type='token_acquire' placeholder={this.props.token_acquire} />
            <Column type='token_change' placeholder={this.props.token_change} trend={this.props.trend} />
            <Column type='token_rol' placeholder={this.props.token_rol} />
            <Column type='token_position' placeholder={this.props.token_position} />
          </div>
  }
}

class Table1 extends React.Component {
  render(){
	return <div className="table">
          <div  className={this.props.show? 'section-hide': 'section-show'}>
					{
					  this.props.tables.map((data, i) => {
						  return <Row1 key={i} uuid={i} timeStamp={data.timeStamp} qty={data.qty} token_value={data.token_value} token_price={data.token_price} token_average={data.token_average} token_acquire={data.token_acquire} token_change={data.token_change} token_rol={data.token_rol} token_position={data.token_position} trend={data.trend} chain={data.chain} />
					  })
					}
          </div>
			</div>
  }
}

class Row extends React.Component {
  render(){
	return  <div>
            <div className="tr">
              <Column type='token' placeholder={this.props.token} trend={this.props.trend} />
              <Column type='qty' placeholder={this.props.qty} />
              <Column type='token_value' placeholder={this.props.token_value} />
              <Column type='token_price' placeholder={this.props.token_price} />
              <Column type='token_average' placeholder={this.props.token_average} />
              <Column type='token_acquire' placeholder={this.props.token_acquire} />
              <Column type='token_change' placeholder={this.props.token_change} trend={this.props.trend} />
              <Column type='token_rol' placeholder={this.props.token_rol} />
              <Column type='token_position' placeholder={this.props.token_position} />
            </div>
            <Table1 tables = {this.props.tables} show={this.props.show}/>
          </div>
  }
}

class Table extends React.Component {
  render(){
	return <div className="table">
					<div className="tr thead">
						<div className="td table-header">TOKEN</div>
						<div className="td table-header">QTY</div>
						<div className="td table-header">VALUE</div>
						<div className="td table-header two">CURRENT<br/>PRICE</div>
						<div className="td table-header two">AVERAGE<br/>BUY PRICE</div>
						<div className="td table-header two">ACQUIRED<br/>VALUE</div>
						<div className="td table-header two">24H<br/>CHANGE</div>
						<div className="td table-header small" >ROI</div>
						<div className="td table-header two small">PRICE<br/>GRAPH</div>
					</div>
					{
					  this.props.tokens.map((data, i) => {
						  return <Row key={i} uuid={i} token={data.token} wallet_address={data.wallet_address} qty={data.qty} token_value={data.token_value} token_price={data.token_price} token_average={data.token_average} token_acquire={data.token_acquire} token_change={data.token_change} token_rol={data.token_rol} token_position={data.token_position} trend={data.trend} chain={data.chain} tables={data.tables} show={this.props.show} />
					  })
					}
			</div>
  }
}

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tokens: datasByRow};
  }
  render(){
    return <div>
      {
        this.props.datas.map((data, i) => {
          if (data.wallet_name === "" ) {data.wallet_name = i+1;} 
          return <div key={i} uuid={i} className="transaction-section row mx-0 mb-4 hide">
					<div className="wallet-header">
						<h4 className="mb-4">{data.wallet_name}<RenameButton uuid={i} name={data.wallet_name} state={this.props.datas} onRename={this.props.onRename}/></h4>                    
						<h5 className="transaction cursor"><ShowButton uuid={i} show={data.show} onShow={this.props.onShow}/></h5>
					</div>					           
					<Table tokens={data.tokens} show={data.show}/>
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
    return <span className="smallWindow">
      <span variant="primary" onClick={this.handleShow} className="cursor address-icon"></span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename your address</Modal.Title>
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
    this.state = { datas: datasByRow, tables: tablesByRow, tokens: tablesByRow, temps: tablesByRow, token_list:tablesByRow, symbols: symbolByRow, loading:false};
    this.onDelete = this.onDelete.bind(this);
    this.onShow = this.onShow.bind(this);
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

  onShow(id) {
    const data_list = this.state.datas;
    data_list[id].show = !data_list[id].show;
    this.setState({datas: data_list});
  }

  onRename(data_list) {
    this.setState({datas: data_list});
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
    
    data_list[id].BNBs=(data_list[id].post_transfer / data_list[id].BNB_price).toFixed(10);
    data_list[id].new_tokens=(data_list[id].BNBs * data_list[id].token_price).toFixed(2);
    data_list[id].increase=(data_list[id].new_tokens - buy_token_input).toFixed(2);	
    
    this.setState({datas: data_list, counter: data_list.length});
  }
  
  async onRefresh(id, token_position, status, trend, chain, temp1, temp2, temp3){
    
  }
  
  async onCreate(wallet_address, wallet_name, wallet_chain, coins, tables, tables1, tokens, tokens1, temps, token_list, token, qty, token_value, token_price, token_average, token_acquire, token_change, token_rol, token_position, trend, chain, temp1, temp2, temp3, url1, url2, url3, url4, url5, url6, url7, show){
    this.setState({loading : true})
    tokens = tables = temps = token_list = tokens1 = tables1 = [];
    this.setState({tokens : []})
    this.setState({tables : []})
    this.setState({temps : []})
    this.setState({token_list : []})
    wallet_address = wallet_address.trim().toLowerCase();
    switch(wallet_chain) {
      case '1':
        url1 = 'https://api.bscscan.com/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        url2 = 'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        url3 = 'https://api.bscscan.com/api?module=account&action=txlist&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        url4 = 'https://api.bscscan.com/api?module=account&action=tokentx&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
        chain = 'binancecoin'
        token_position = 'https://poocoin.app/tokens/0xb8c77482e45f1f44de1745f52c74426c631bdd52';
        token = 'BNB'
        break;
	    case '2':
        url1 = 'https://api.etherscan.io/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        url2 = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        url3 = 'https://api.etherscan.io/api?module=account&action=txlist&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        url4 = 'https://api.etherscan.io/api?module=account&action=tokentx&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        chain = 'ethereum'
        token_position = 'https://poocoin.app/tokens/0x2170ed0880ac9a755fd29b2688956bd959f933f8';
        token = 'ETH'
        break;
      default:
        break;
    }
    
    await fetch(url1).then(async response => {
      const data = await response.json();
      (data.message === "OK")? qty = (Number(data.result)/1000000000000000000).toFixed(10).replace(/0+$/, ""): qty = "Invalid Wallet";
      return this.state;
    })
    .catch(error => {
      qty="Invalid Wallet"	
    })

    await fetch(url2).then(async response => {
      const data = await response.json();
      if (data.message === "OK"){
        token_price = data.result.ethusd;
        token_value =(Number(qty) * Number(token_price)).toFixed(2) ;
      } 
      return this.state;
    })
    .catch(error => {
      token_price = token_value="Invalid Wallet"	
    })

    await axios.get(process.env.REACT_APP_SERVER_URL+'/trend', { params : { chain: chain}}).then( async res => {
      const data = await JSON.parse(res.data);
      token_change = 0;
      data["prices"].map(function(object, i){
        if (i===23) {	
          token_change = token_change + object[1]; 
        }
        return token_change;
      })     
      token_change = ((token_price - token_change)/token_change * 100 ).toFixed(2);    
      (token_change >= 0 ) ? trend="positive": trend="negative"; 
    }).catch(err => {
      console.error(err);
    })

    await axios.get(process.env.REACT_APP_SERVER_URL+'/coins', { params : { chain: chain}}).then( async res => {
      //const coins = await JSON.parse(res.data);      
      coins = res.data;
    }).catch(err => {
      console.error(err);
    })
    token_average = token_price;
    token_acquire = (Number(qty) * Number(token_average)).toFixed(2)
    token_rol = ((token_value / token_acquire) * 100 ).toFixed(2)    
    
    await fetch(url3).then(async response => {
      const data1 = await response.json();
      if (data1.message === "OK"){
        if (data1.result.length >= 1) {
          data1.result.map((data, i) => {
            if (data.to === wallet_address && Number(data.value) > 0) {
              temp2 = (Number(data.value)/1000000000000000000).toFixed(10).replace(/0+$/, "")
              //temp2 = (Number(data.value)/1000000000000000000).toFixed(8).replace(/0+$/, "").replace(/.\s*$/, "") 
              temp3 = new Date(data.timeStamp * 1000).toISOString().slice(0,10);
              tables = tables.concat([{ timeStamp:temp3, qty:temp2, token_value:(Number(temp2) * Number(token_price)).toFixed(2), token_price:token_price, token_average:token_average, token_acquire:(Number(temp2) * Number(token_average)).toFixed(2), token_change:token_change, trend:trend, token_rol:token_rol, token_position:token_position}]);
            }            
            return this.state;
          })
        }
      } 
    })
    .catch(error => {
      //temp1="Transaction is not existed"	
    })

	  tokens = this.state.tokens.concat([{ token:token, qty:qty, token_value:token_value, token_price:token_price, token_average:token_average, token_acquire:token_acquire, token_change:token_change, trend:trend, token_rol:token_rol, token_position:token_position, tables:tables}]);
    this.setState({tokens: tokens});

    await fetch(url4).then(async response => {
      const res = await response.json();
      if (res.message === "OK"){
        if (res.result.length >= 1) {
          res.result.map((data, i) => {
            temps = temps.concat([{ blockNumber:data.blockNumber, timeStamp:data.timeStamp, from:data.from, to:data.to, contractAddress:data.contractAddress, value:data.value, tokenName:data.tokenName, tokenSymbol:data.tokenSymbol, tokenDecimal:data.tokenDecimal}]);
            // temps = this.state.temps.concat([data.tokenName]);
            // this.setState({temps:temps})
            return this.state;
          })
          token_list = [...new Map(temps.map(item => [item["tokenName"], item])).values()]
          //token_list = temps.filter((value, index)=>temps.indexOf(value)===index);
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
        coins.map((data1, j)=>{
          if (data1.symbol === data.tokenSymbol.toLowerCase()){
            token_list[i].coin_id = data1.symbol           
          }
          return data1.symbol;
        })

        return this.state;
      })

      await Promise.all(token_list.map(async(data, i)=>  {
          await fetch(data.token_balance_url).then(async response => {
            const data1 = await response.json();
            temp1 = 10** data.tokenDecimal;
            tokens1 = tokens1.concat([{token:token_list[i].tokenSymbol, qty:(Number(data1.result)/temp1).toFixed(10).replace(/0+$/, "")}])
            return this.state;
          })
          .catch(error => {
            tokens1 = tokens1.concat([{token:'Invalid Token'}])
          })
        })
      )

      await Promise.all(token_list.map(async(data, i)=>  {
        //await setTimeout( this.subquery.call(null, token_list, data, i),1000); 
        sleep(600);
          await fetch(data.token_price_url).then(async response => {
            const data1 = await response.json();
            if (data1.message === "OK") {
              tokens1[i].token_price = data1.result[0].tokenPriceUSD;
              tokens1[i].token_value = (tokens1[i].qty * tokens1[i].token_price).toFixed(2)
              tokens1[i].token_average = data1.result[0].tokenPriceUSD;
              tokens1[i].token_acquire = (Number(tokens1[i].qty) * Number(tokens1[i].token_average)).toFixed(2);
              tokens1[i].token_rol = ((tokens1[i].token_value / tokens1[i].token_acquire) * 100 ).toFixed(2);
              tokens1[i].token_position =  'https://poocoin.app/tokens/'+data.contractAddress;
              tokens1[i].tokenDecimal = data.tokenDecimal;
            } else {
              tokens1[i].token_price = "Invalid Token";
            } 
            return this.state;
          })
          .catch(error => {
            tokens1[i].token_price="Invalid Token"	
          }) 
        })
      )
      
      await Promise.all(token_list.map(async(data, i)=>  {
          await axios.get(process.env.REACT_APP_SERVER_URL+'/trend', { params : { chain: data.coin_id}}).then( async res => {
            const data1 = await JSON.parse(res.data);
            tokens1[i].token_change = 0;
            data1["prices"].map(function(object, i){
              if (i===23) {	
                tokens1[i].token_change = tokens1[i].token_change + object[1]; 
              }
              return tokens1[i].token_change;
            })     
            tokens1[i].token_change = ((tokens1[i].token_price - tokens1[i].token_change)/tokens1[i].token_change * 100 ).toFixed(2);    
            (tokens1[i].token_change >= 0 ) ? tokens1[i].trend="positive": tokens1[i].trend="negative"; 
          }).catch(err => {
            console.error(err);
          })
        })
      )

      tokens1.map((token, i)=>{  
        tables1=[];  
        temps.map((transaction, i)=>{
          temp3 = new Date(transaction.timeStamp * 1000).toISOString().slice(0,10);
          temp1 = (Number(transaction.value)/(10**token.tokenDecimal)).toFixed(10).replace(/0+$/, "")
          if (transaction.tokenSymbol === token.token && transaction.to === wallet_address) {
            tables1 = tables1.concat([{timeStamp:temp3, qty:temp1, token_value:(temp1 * Number(token.token_price)).toFixed(2), token_price:token.token_price, token_average:token.token_average, token_acquire:(temp1 * Number(token.token_average)).toFixed(2), token_change:token.token_change, trend:token.trend, token_rol:token.token_rol, token_position:token.token_position}]);
          }
          return temp1;
        })
        tokens1[i].tables = tables1;
        return temp1;
      })
      // tokens.map((token, j)=>{     
      //   token_list.map((data, i)=>{    
      //     if (token.transaction_token == data.transaction_token) {
      //       tokens[j] = { blockNumber:token.blockNumber, transaction_token: token.transaction_token, transaction_from: token.transaction_from, transaction_to:token.transaction_to, transaction_date:token.transaction_date, transaction_qty:token.transaction_qty, transaction_orientation:token.transaction_orientation, transaction_amount:(Number(token.transaction_qty) * Number(data.transaction_price)).toFixed(10), transaction_price:token.transaction_price, transaction_balance:data.transaction_balance}
      //     }
      //   }) 
      // })
      // tables = tables.concat(temps);
      tokens = tokens.concat(tokens1);
    }  
    
/*
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
      token_change="Error";
    })
*/  
    show = true;
    this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address, wallet_name:wallet_name, wallet_chain:wallet_chain, tokens:tokens, show:show}])})
    this.setState({loading : false}) 
  }
  
  render(){
	  return <div className="exchange wallet">
				<div className="top-bar">
					<h3 className="page-title">My Address</h3>
					<button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
				</div>
				<div className="container-fluid small" datas={this.state.datas} >
					<div className="mb-5">
						<h4>Add Address</h4>
						<Inputs onCreate={this.onCreate}/>
						<Loading loading={this.state.loading}/>
						<Group datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} onShow={this.onShow}/>  
					</div>					
				</div>
			</div>
      
  }
}
	
export default Wallet;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
