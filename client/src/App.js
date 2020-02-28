import React, { Component } from 'react';
import axios from 'axios';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip'

class App extends Component {
  constructor() {
    super();
    this.state = {
      stateData: [],
    };
  }

  clickPost = e => {
    e.preventDefault();

    const url = '/data';
    axios.post(url, {
      name: this.inputname.value,
      age: this.inputage.value
    })
    .then( response => console.log(response) )
    .catch( error => console.log(error) );

    this.inputname.value = '';
    this.inputage.value = '';
  };

  clickGet = e => {
    e.preventDefault();
    
    const url = '/data';
    axios.get(url)
    .then( res => {
      console.log(res.data);
      this.setState({stateData: res.data});
    });
  };

  render() {
    const dataMySQL = this.state.stateData.map((item, index)=>{
      var array = ['name: ',item.name,', age: ', item.age, ' years old.'].join(' ');
      return <p key={index}>{array}</p>;
    });

    return (
      <div className="container">
        <Zoom>
          <center style={{margin:'25px'}}>
            <Flip><h3 style={{textAlign: "center"}}>React ♥ Express ♥ MySQL</h3></Flip>
            <form>
              <div className="form-group" style={{margin:'15px'}}>
                <input className="form-control" type="text" id="name" ref={ inname => this.inputname = inname } placeholder="write a name!"/>
              </div>

              <div className="form-group" style={{margin:'15px'}}>
                <input className="form-control" type="number" id="age" ref={ inage => this.inputage = inage } placeholder="write age!"/>
              </div>
              
              <button className="btn btn-primary" style={{width:'100px', alignSelf: "auto"}} onClick={this.clickPost}>POST</button>
              
              <button className="btn btn-success" style={{margin:'15px',width:'100px'}} onClick={this.clickGet}>GET</button>
            </form>

            <div>
              { dataMySQL }
            </div>
          </center>
        </Zoom>
      </div>
    );
  }
}
 
export default App;