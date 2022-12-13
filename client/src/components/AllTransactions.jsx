import React, { useState, useEffect } from "react";
import './AllTransactions.css';
import TransactionCard from "./TransactionCard";
import axios from "axios";

const AllTransactions = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get("http://localhost:5000/alltransactions")
      
      setTransactions(data);
    }

    fetchTransactions();
  }, [])

  return(
    <div className="transactionsContainer">
      <h1>All Transactions</h1>

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

export default AllTransactions;