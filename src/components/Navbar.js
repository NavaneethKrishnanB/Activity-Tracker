import React from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component{
    render()
    {
        return (
<nav className="navbar navbar-light bg-light">
  <Link to="/" className="navbar-brand"><h1>ActivityTracker</h1></Link>
  <div className=" Navbar-collapse">
      <ul className="navbar-nav mr-auto">
      <li className="navbar-item">
          <Link to="/" className="nav-link">Activity</Link>
      </li>
      <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Activity Log</Link>
      </li>
      <li className="navbar-item">
      <Link to="/student" className="nav-link">Admit Student </Link>
      </li>
      </ul>
  </div>
</nav>
        );
    }
}
