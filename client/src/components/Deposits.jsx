import React, { useState, useEffect } from "react";
import './Deposits.css';
import TransactionCard from "./TransactionCard";
import axios from "axios";

const Deposits = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get("http://localhost:5000/deposits")
      
      setTransactions(data);
    }

    fetchTransactions();
  }, [])

  return(
    <div className="depositsContainer">
      <h1>Deposits</h1>

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
  );
}

export default Deposits;