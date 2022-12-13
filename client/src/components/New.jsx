import axios from "axios";
import React, { useState } from "react";
import './New.css'

const New = () => {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleDate = (e) => {
    setDate(e.target.value);
  }

  const handleType = (e) => {
    setType(e.target.value);
  }

  const submitForm = () => {
    axios.post('http://localhost:5000/new', {
      name,
      amount,
      date,
      transactionType: type
    })
    .then(function (response) {
      if(response.data.statusCode === 200){
        setSuccessMsg(true);
      }
      else {
        setErrorMsg(true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
    
    if(successMsg) {
      setSuccessMsg(false);
    }

    if(errorMsg) {
      setErrorMsg(false);
    }
  }

  return(
    <div className="new-page">

      <form id="form">
        <h1>New Transaction</h1>

        <label id="name-label">
          Name of Transaction
          <input id="name" 
            name="name" 
            type="text" 
            placeholder="e.g. Water Bill" 
            required 
            onChange={handleName}
          />
        </label>

        <label id="amount-label">
          Amount
          <input id="amount"
            name="amount" 
            type="number" 
            step="any" 
            placeholder="0.00" 
            required   
            onChange={handleAmount}
          />
        </label>

        <label id="date-label">
          Date
          <input id="date" 
            name="date"
            type="date" 
            required 
            onChange={handleDate}
          />
        </label>

        <label id="type-label">
          Type of Transaction
          <select id="transactionType" 
            name="transactionType"
            required
            onChange={handleType}
          >
            <option value="">Select the type of transaction</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="deposit">Deposit</option>
          </select>
        </label>

        <div>
          <p className={`transparent ${successMsg ? "success-message" : ""}`}>Transaction added!</p>
          <p className={`transparent ${errorMsg ? "error-message" : ""}`} style={{marginTop: -20}}>Error adding transaction!</p>
        </div>
        <button id="submit" onClick={handleSubmit}>Add Transaction</button>
      </form>

    </div>
  );
}

export default New;