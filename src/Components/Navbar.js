import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  updateInputValue = (evt)=>{
    const val = evt.target.value;
    console.log(val);
    this.setState({inputValue: val});
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <Link className="navbar-brand mx-2" to="/">
            NEWSAPP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" style={{marginRight:'auto'}}>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.inputValue}
                onChange={evt => this.updateInputValue(evt)}
              />
              <Link 
                className="btn btn-outline-success my-2 my-sm-0 mx-2"
                type="submit"
                to={this.state.inputValue}
              >
                Search
              </Link>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
