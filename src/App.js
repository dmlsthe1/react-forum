import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    fName: "",
    lName: "",
    phone: "",
    users: []
  }

  componentWillMount = () => {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "get"
    };
    return fetch("/api/users", obj).then(res => {
      if (!res.ok) return Promise.reject(res.statusText);
      return res.json();
    }).then(res => this.setState({users: res}))
    .catch(console.error);
  }

  handleChange = ({target: {name, value}}) => {
    if(name === "phone") value = value.replace(/\D/g, "");
    this.setState({ [name]: value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    const payload = {...this.state};
    delete payload.users;

    const obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(payload)
    };
    fetch("/api/form", obj).then(res => {
      if (!res.ok) return Promise.reject(res.statusText);
      return res.json();
    }).then(res => this.fetchUsers())
    .catch(console.error);
  }

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr key={`${user.fName}${user.phone}`}>
          <td>{user.fName}</td>
          <td>{user.lName}</td>
          <td>{user.phone}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fName">First Name: </label>
          <input id="fName" name="fName" type="text" value={this.state.fName} onChange={this.handleChange}/>
          <label htmlFor="lName">Last Name: </label>
          <input id="lName" name="lName" type="text" value={this.state.lName} onChange={this.handleChange}/>
          <label htmlFor="phone">Phone Number: </label>
          <input id="phone" name="phone" type="tel" value={this.state.phone} onChange={this.handleChange}/>
          <button type="submit">Click Me</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.length ? this.renderUsers() : <tr></tr>}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
