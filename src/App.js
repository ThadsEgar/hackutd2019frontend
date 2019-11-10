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
        <Container>
          <Router>
            <div>
              <Route exact path="/" component={FormRegistration}/>
              <Route 
                path="/sign-in" 
                render={(props) => <SignIn {...props} isloggedin={isloggedin} setLoggedin={setLoggedin}/>}
              />
              {isloggedin && <Route path="/map" component={MapVisual} />}
            </div>
          </Router>
        </Container>
    </div>
  );
}

export default App;
