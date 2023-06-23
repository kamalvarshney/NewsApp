import { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component{

  state ={
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  render(){
  const pageSize = 12;
  const apiKey = "03dbc497cc0440b087ba94638e2cb785";
  return (
    
    <div>
    <Router>
    <Navbar/>
    <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
    <Routes>
    <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={apiKey} key='home' pageSize={pageSize} country="in" category='general'/>} />
    <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country="in" category='general'/>} />
    <Route exact path="/sports"  element={<News setProgress={this.setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country="in" category='sports'/>} />
    <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country="in" category='science'/>} />
    <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country="in" category='entertainment'/>} />
    <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country="in" category='technology'/>} />
    <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country="in" category='business'/>} />
    <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country="in" category='health'/>} />
    </Routes>
    </Router>
    </div>
    
  );
}
}
