import React from 'react';
import Home from './Home';
import UploadForm from './FileUpload';
import Navigator from './NavigationBar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>        
        <Navigator />
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/batchprocessing' component={UploadForm}/>            
            <Home />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
