import React, { useState, useEffect } from "react";
import './Home.css';
import axios from 'axios';
import TransactionCard from "./TransactionCard";
import {Link} from "react-router-dom";
import { toCurrencyString } from "../util";


const Home = () => {

  const [totalBalance, setTotalBalance] = useState("$0.00");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTotal = async () => {
      const { data } = await axios.get("http://localhost:5000/total");
      setTotalBalance(toCurrencyString(data));
    }
    
    const fetchTransactions = async () => {
      const { data } = await axios.get("http://localhost:5000/recent")     
      setTransactions(data);
    }

    fetchTransactions();
    fetchTotal()
  }, [])

  return(
    <div className="home-page">
      <div className="main">
        <h1><b>{totalBalance}</b></h1>
        <hr/>
        <h4>TOTAL BALANCE</h4>
      </div>
      <div className="recent-section">
        <div className="recent-text">
          <p>Recent</p> 
          <p>Activity</p>
          <Link to="/transactions"><button>View All</button></Link>
        </div>
        <hr className="vertical-divider"/>
        <div className="recent-transactions">
          
          {transactions.map(transaction => 
            <TransactionCard id={transaction.id} 
              key={transaction.id}
              price={transaction.amount} 
              description={transaction.name} 
              date={transaction.date}
              type={transaction.type}
            />
          )}

        </div>
      </div>
    </div>  
  );
}

export default Home;