import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

  let [isCollapsed, setIsCollapsed] = useState(true);

  return(
    <nav>
      <h1>
        <Link to="/">Finance App</Link>
      </h1>
      <div className='links'>
        <b>
          <Link to="/">Home</Link>
        </b>
        <div className='transaction-section'
          onMouseEnter={() => {setIsCollapsed(false)}}
          onMouseLeave={() => {setIsCollapsed(true)}}
        >
          <b className='transaction-link'>Transactions</b>
          <ul className={`transaction-menu ${isCollapsed ? "collapsed" : "expanded"}`}>
            <li>
              <Link to="/withdrawals">Withdrawals</Link>
            </li>
            <li>
              <Link to="/deposits">Deposits</Link>
            </li>
            <li>
              <Link to="/transactions">All Transactions</Link>
            </li>
            <li>
              <Link to="/new">New Transaction</Link>
            </li>
          </ul>
        </div>
      </div>

    </nav>
    
  );
}

export default NavBar;