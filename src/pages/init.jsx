import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const datasByRow = [];

class Loading extends React.Component {
  render(){
	if (this.props.loading) {
		return <div className="justify-content-center navbar mb-3"><img width="100" height="100" src="/2.gif" alt="Please wait for loading"/></div>
	} else {
		return <div></div>
	}
  }
}

class Process extends React.Component {
   
  render(){
    return <div>
      {
        this.props.datas.map((data, i) => {
          if (data.label === "before" ) {
            return <div key={i} uuid={i}><h4 className="before">{data.content}</h4></div>
          } else if (data.label === "after" ) {
            return <div key={i} uuid={i}><h4 className="after">{data.content}</h4></div>
          } else {
            return <div key={i} uuid={i}><h4 className="warning">{data.content}</h4></div>
          }         
        })
      } 
    </div>
  }
}

class Init extends Component {
  constructor(props) {
    super(props);
    this.state = {datas:datasByRow, tempArray:datasByRow, tempArray1:datasByRow, docCount:0, loading:false};
    this.onDB = this.onDB.bind(this);
    this.onToken = this.onToken.bind(this);
    this.onBalance = this.onBalance.bind(this);
    this.onROI = this.onROI.bind(this);

  }

  async componentDidMount(temp1, temp2, temp3, temp4) {
    temp1 = 0;
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
/*    //axios.get(process.env.REACT_APP_SERVER_URL+'/init/token').then( async res => {
    await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true').then( res => {  
        temp1 = temp2 = 0;	
        Promise.all(res.data.map(async (result, i)=>{		
            for(const name in result.platforms) {
              if (name === "binance-smart-chain"){
                //token = {token_id:result.id, token_symbol:result.symbol, token_name:result.name, token_platform:"binance-smart-chain", token_address:result.platforms[name]}
                  await axios.post(process.env.REACT_APP_SERVER_URL+'/init/token', {token_id:result.id, token_symbol:result.symbol, token_name:result.name, token_platform:"binance-smart-chain", token_address:result.platforms[name]}).then(async response => {
                    const result1 = await response.data;     
                    temp2 = Number(temp2) + 1;
                  })
                  .catch(error => {
                    console.log(error);
                  })
              }	
            }		
          })
        ).then(responses =>{
          this.setState({datas: this.state.datas.concat([{ label:"after", content:'Created "Token" table.'}])})
        })        
      }).catch(err => {
        console.log(err);
      })
    
    await Promise.all(
      this.state.tempArray.map(async(data, i)=>  {      
        await axios.get(process.env.REACT_APP_SERVER_URL+'/init/token_get', { params : { page: data.label}}).then( async res => {
          const results = await JSON.parse(res.data);
          this.state.tempArray1 = this.state.tempArray1.concat([results])
        }).catch(err => {
          console.log(err);
        })
      })
    ).then(response=>{
      console.log("test")
      // if (status === "ok"){
      //   this.setState({datas: this.state.datas.concat([{ label:"after", content:'Updated the "Token" list.'}])})
      // } else {
      //   this.setState({datas: this.state.datas.concat([{ label:"warning", content:'Did not update the "Token" list. Please try it again'}])})
      // } 
    })
*/

    

  }

  async onDB(){
    this.setState({loading:true});   
    this.setState({datas:datasByRow})
    this.setState({datas: this.state.datas.concat([{ label:"before", content:'Is initializing DB ...'}])});
    await axios.get(process.env.REACT_APP_SERVER_URL+'/init/db', { params : { id: localStorage.getItem('id')}}).then( async res => {
      const result = await res.data;
      if (result.status === "ok"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'Initialized DB.'}])})
      } else {
        this.setState({datas: this.state.datas.concat([{ label:"warning", content:'Did not initialize DB. Please try it again'}])})
      }         
    }).catch(err => {
      console.log(err);
    })
  
    this.setState({datas: this.state.datas.concat([{ label:"before", content:'Is creating "Token" table ...'}])});
    await axios.get(process.env.REACT_APP_SERVER_URL+'/init/token').then( async res => {
      const result = await res.data;
      if (result.status === "ok"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'Created the "Token" table.'}])})
      } else {
        this.setState({datas: this.state.datas.concat([{ label:"warning", content:'Did not create the "Token" table. Please try it again'}])})
      }  
    }).catch(err => {
      console.log(err);
    })

    this.setState({loading:false}); 
  }

  async onToken(){
    this.setState({loading:true});    
    this.setState({datas:datasByRow})

    this.setState({datas: this.state.datas.concat([{ label:"before", content:'Is initializing "Token" table ...'}])});
    await axios.get(process.env.REACT_APP_SERVER_URL+'/init/token').then( async res => {
      const result = await res.data;
      if (result.status === "ok"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'Initialized the "Token" table.'}])})
      } else {
        this.setState({datas: this.state.datas.concat([{ label:"warning", content:'Did not initialize the "Token" table. Please try it again'}])})
      }  
    }).catch(err => {
      console.log(err);
    })

    this.setState({loading:false}); 
  }

  async onBalance(){
    this.setState({loading:true});  
    this.setState({datas:datasByRow})  

    this.setState({datas: this.state.datas.concat([{ label:"before", content:'Is initializing "Balance" table ...'}])});
    await axios.get(process.env.REACT_APP_SERVER_URL+'/init/balance').then( async res => {
      const result = await res.data;
      if (result.status === "ok"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'Initialized the "Balance" table.'}])})
      } else if (result.status === "zero"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'You never have the "Wallet" table.'}])})
      } else {
        this.setState({datas: this.state.datas.concat([{ label:"warning", content:'Did not initialize the "Balance" table. Please try it again'}])})
      }  
    }).catch(err => {
      console.log(err);
    })

    this.setState({loading:false}); 
  }

  async onROI(){
    this.setState({loading:true});    
    this.setState({datas:datasByRow})

    this.setState({datas: this.state.datas.concat([{ label:"before", content:'Is initializing the tables related with "ROI" ...'}])});
    await axios.get(process.env.REACT_APP_SERVER_URL+'/init/roi').then( async res => {
      const result = await res.data;
      if (result.status === "ok"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'Initialized the tables related with "ROI".'}])})
      } else if (result.status === "zero"){
        this.setState({datas: this.state.datas.concat([{ label:"after", content:'You never have the "Wallet" table.'}])})
      } else {
        this.setState({datas: this.state.datas.concat([{ label:"warning", content:'Did not initialize the tables related with "ROI". Please try it again'}])})
      }  
    }).catch(err => {
      console.log(err);
    })

    this.setState({loading:false}); 
  }

  render() {
      return <div className="initialization">
              <div className="center">
                <div className="top-bar">
                  <h1 className="page-title my-5">Initialization</h1>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4 py-5">
                      <button className="refresh btn" onClick={this.onDB}>DB Initialize</button>
                      <button className="refresh btn" onClick={this.onToken}>Token Initialize</button>
                      <button className="refresh btn" onClick={this.onBalance}>Balance Initialize</button>
                      <button className="refresh btn" onClick={this.onROI}>ROI Initialize</button>
                      <button className="refresh btn" onClick={() => window.location.reload(false)}>Retry</button>
                      <button className="refresh btn" onClick={() => window.location.href="/dashboard"} >Go to site</button>
                    </div>
                    <div className="col-md-8 py-5" >
                      <div className="my-5">
                        <Loading loading={this.state.loading}/>
                      </div>	
                      <div className="process my-4">
                        <Process datas={this.state.datas}></Process>  
                      </div>	
                      <div className="footer-bar">
                        
                      </div>			
                    </div>
                  </div>
                </div>
              </div>
            </div>    
  }
}

Init.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Init);

// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }
