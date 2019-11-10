import React, {useState, useEffect} from 'react';
import {Container} from "react-bootstrap"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"

import './App.css';
import FormRegistration from './Components/FormRegistration';
import SignIn from './Components/SignIn';
import MapVisual from './Components/MapVisual';

function App() {
  const [isloggedin, setLoggedin] = useState({
    isloggedin: false
  })

  return (
    <div className="App">
        
          <Router>
            {isloggedin && <Route path="/map" component={MapVisual} />}
            <div className="main">
            <Container>
              <Route exact path="/" component={FormRegistration}/>
              <Route 
                path="/sign-in" 
                render={(props) => <SignIn {...props} isloggedin={isloggedin} setLoggedin={setLoggedin}/>}
              />
              </Container>
            </div>
          </Router>
        
    </div>
  );
}

export default App;
