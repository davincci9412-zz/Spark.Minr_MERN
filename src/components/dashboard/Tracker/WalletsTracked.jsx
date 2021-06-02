import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const datasByRow = [];
const symbolByRow = [];
const tablesByRow = [];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addressValid: false,  descriptionValid: false, chainValid: false,  formValid: false, wallet_address:'', wallet_description:'', wallet_chain:'', token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'',token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
    this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value, false) });
  }
  handleClear() {
	  this.setState({wallet_address:'', wallet_description:'', wallet_chain:'', addressValid: false,  descriptionValid: false, chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'', token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''});
  }
  
  validateField(fieldName, value, valueExist) {
    if (value.length >=1 ) { valueExist = true; } else {valueExist = false; }
    switch(fieldName) {
      case 'wallet_address':
        this.setState({addressValid: valueExist}, ()=>{
          this.setState({addressValid: valueExist});
        })
        break;
      case 'wallet_description':
        this.setState({descriptionValid: valueExist}, ()=>{
          this.setState({descriptionValid: valueExist});
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
    this.setState({formValid: this.state.addressValid && this.state.descriptionValid && this.state.chainValid}, ()=>{
      this.setState({formValid: this.state.addressValid && this.state.descriptionValid && this.state.chainValid});
    })
  }
    
  render(){
	return  <div className='row mb-5'>
	  <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} value={this.state.wallet_address} placeholder='Wallet Address' />
	  <Input0 name='wallet_description' change={this.handleChange.bind(this, 'wallet_description')} value={this.state.wallet_description} placeholder='Description' />
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
    return <div className='col-md-3'>
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
class RenameButton extends React.Component {
	render(){
		return <td>
		  <div className="cursor remove"><ModalWindow index={this.props.uuid} old_description= {this.props.old_description} state={this.props.state} rename={this.props.onRename}/></div>
		</td>
	}
}
class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}	
	render(){
		return <td>
		  <div className="cursor remove"><span onClick={this.onClick.bind(this)}>Remove</span></div>
		</td>
	}
}
class NotificationButton extends React.Component {
	onClick() {
	  this.props.notification.call(null, this.props.uuid);
	}	
	render(){
		return <td>
		  <div className="cursor remove"><span onClick={this.onClick.bind(this)}>Set Notification</span><span className="fa fa-ring"></span></div>
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
		return <td><div className="input-group"><input type='text' name="buy_token_input" onChange={this.handleChange.bind(this, 'buy_token_input')} value={this.props.value} className='form-control' /><button type="button" className="input-group-postpend btn btn-success" onClick={this.onClick.bind(this)}>Go</button></div></td>		
	}
}

class AddButton extends React.Component {
	onClick(){
	  this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_description, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.transaction_wallet, this.props.newData.transaction_crypto, this.props.newData.transaction_date,this.props.newData.transaction_qty, this.props.newData.transaction_amount, this.props.newData.trend, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
    this.props.clear.call(null);
	}
	render(){
		return <button type="button" style={{ "width": "100%" }} className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled}>Add</button>
	}
}

class Column extends React.Component {
  render(){
    if (this.props.placeholder === "Red"){
      return <td><span className="text-danger">
        {this.props.placeholder}
      </span></td> 
    } else if (this.props.placeholder === "Green"){
      return <td><span className="text-success">
        {this.props.placeholder}
      </span></td> 
    } else if (this.props.placeholder === "Negative"){
      return <td><span className="red-arrow text-danger">
        {this.props.placeholder}<span className="fa fa-arrow-down"></span>
      </span></td> 
    } else if (this.props.placeholder === "Positive"){
      return <td><span className="green-arrow text-success">
        {this.props.placeholder}<span className="fa fa-arrow-up"></span>
      </span></td> 
    } if (this.props.type === "buy_fee" || this.props.type === "sell_fee" || this.props.type === "transfer_fee" || this.props.type === "buffer_fee" || this.props.type === "total"){
      return <td>{this.props.placeholder}%</td> 
    } else {
      return <td>{this.props.placeholder}</td> 
    }	
  }
}

class Row extends React.Component {
  render(){
    return  <tr>
      <Column type='wallet_address' placeholder={this.props.wallet_address} />
      <RenameButton uuid={this.props.uuid} onRename={this.props.onRename} old_description={this.props.wallet_description} state={this.props.datas}/>
      <DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
      <Column type='wallet_description' placeholder={this.props.wallet_description} />
      <NotificationButton uuid={this.props.uuid} notification={this.props.onNotification} />
    </tr>
  }
}

class Table extends React.Component {
  render(){
	return <table className="table table-bordered">
				<thead>
					<tr>
						<th colSpan="3">Wallet</th>
            <th colSpan="2">Description</th>
					</tr>
				</thead>
				<tbody>
					{
					  this.props.datas.map((data, i) => {
						return <Row key={i} uuid={i} datas={this.props.datas} wallet_address={data.wallet_address} wallet_description={data.wallet_description} wallet_chain = {data.wallet_chain} tables={data.tables} transaction_wallet={data.transaction_wallet} transaction_crypto={data.transaction_crypto} transaction_date={data.transaction_date} transaction_qty={data.butransaction_qtyy} transaction_amount={data.transaction_amount} trend={data.trend} chain={data.chain} temp1={data.temp1} temp2={data.temp2} temp3={data.temp3} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
					  })
					}
				</tbody>
			</table>
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
    return <span><span variant="primary" onClick={this.handleShow}>Change description</span>
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
    this.state = { datas: datasByRow, counter: datasByRow.length, symbols: symbolByRow, tables: tablesByRow, tables_counter: tablesByRow.length, symbol_counter: symbolByRow.length, loading:false};
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
	
  }
  
  async onRefresh(id, transaction, status, trend){
	
  }
   

  async onCreate(wallet_address, wallet_description, wallet_chain, tables, transaction_wallet, transaction_crypto, transaction_date, transaction_qty, transaction_amount, trend, chain, temp1, temp2, temp3){
	  this.setState({loading : true})
    

    tables = this.state.tables.concat([{ transaction_wallet:transaction_wallet, transaction_crypto:transaction_crypto, transaction_date:transaction_date, transaction_qty:transaction_qty, transaction_amount:transaction_amount, trend:trend, chain:chain, temp1:temp1, temp2:temp2, temp3:temp3}])
    this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address, wallet_description:wallet_description, wallet_chain:wallet_chain, tables:tables}])})
    this.setState({loading : false})
  }


  render(){
    return  <div className="exchange wallet">
          <div className="top-bar">
            <h3 className="page-title">Wallet tracker</h3>
            <button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
          </div>
          <div className="container-fluid small" datas={this.state.datas} >
            <div className="mb-5">
              <h3>Add wallet</h3>
              <Inputs onCreate={this.onCreate}/>
              <Loading loading={this.state.loading}/>
              <div>
                <Table datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} />
              </div>
            </div>				
          </div>
        </div>
        
  }
}
	
export default WalletsTracked;  
