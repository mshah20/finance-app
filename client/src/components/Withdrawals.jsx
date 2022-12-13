import React, { useState, useEffect } from "react";
import './Withdrawals.css';
import TransactionCard from "./TransactionCard";
import axios from "axios";

const Withdrawals = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get("http://localhost:5000/withdrawals")
      
      setTransactions(data);
    }

    fetchTransactions();
  }, [])

  return(
    <div className="withdrawalsContainer">
      <h1>Withdrawals</h1>

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

export default Withdrawals;