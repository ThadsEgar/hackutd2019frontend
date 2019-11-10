import React from 'react';
import {Container} from "react-bootstrap"
import {Route, BrowserRouter as Router} from "react-router-dom"

import './App.css';
import FormRegistration from './Components/FormRegistration';
import SignIn from './Components/SignIn';

function App() {
  return (
    <div className="App">
        <Container>
          <Router>
            <div>
              <Route exact path="/" component={FormRegistration}/>
              <Route path="/sign-in" component={SignIn}/>
            </div>
          </Router>
        </Container>
    </div>
  );
}

export default App;
