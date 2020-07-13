import React from 'react';
import  'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router,Route} from 'react-router-dom' //simplifies connecting components
import axios from 'axios'


import Navbar from "./components/Navbar";
import EditActivity from "./components/EditActivity";
import CreateActivity from "./components/CreateActivity";
import ActivityList from "./components/ActivityList";
import CreateStudent from "./components/CreateStudent";
axios.defaults.withCredentials = true;
function App() {
  return (//put everything inside router
    <Router>  
    <Navbar/>
    <div className="container">
    <Route path="/" exact component={ActivityList}/>
    <Route path="/edit/:id" exact component={EditActivity}/>
    <Route path="/create" exact component={CreateActivity}/>
    <Route path="/student" exact component={CreateStudent}/>
    </div>
    </Router>
  );
}

export default App;
