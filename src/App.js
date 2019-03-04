import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super();

  }

  state = {
    id: '',
    pw: '',
    loginState: false
  }

  handleChange = (e) => {
    console.log("name : ", e.target.name)
    console.log("value : ", e.target.value);

    const { value } = e.target
    this.setState({
      [e.target.name]: value,
    })
  }


  handleLogin = () => {
    const { id, pw, loginState } = this.state;

    if ( loginState ) {
      alert("이미로그인 되있거든??")
      return;
    }


    const loginId = id;
    const password = pw;
    console.log("id : ", id ,", pw : ", pw)
    //http://101.101.166.29:4000/api/test
    //axios.post('http://101.101.166.29:4000/api/account/login', {loginId, password, 
    axios.post('/api/account/login', {loginId, password } )
      .then( response => {
        console.log("response : ", response)
        if (response.data.resultCode === "0000") {
          alert("success")
          this.setState({
            loginState: true
          })
        } else {
          alert("fail. resultCode : "+ response.data.resultCode)
        }
      })
      .catch( err => {
        console.log("err : ", err)
        alert("err : "+err)
      });
  }


  render() {
    const {
      handleLogin,
      handleChange,
    } = this;

    return (
      <div className="App">
        <div className="form-login">
          <div className="login-title">로그인</div>

          <div className='login-input'>
            <input 
              name="id"
              type="text"     
              className='input' 
              placeholder="ID"
              onChange={handleChange}
              />
            <input 
              name="pw"
              type="password" 
              className='input' 
              placeholder="PASSWORD"
              onChange={handleChange}
              />
          </div>

          <div className='login-buttons'>
            <button className='btn' onClick={handleLogin}>로그인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
