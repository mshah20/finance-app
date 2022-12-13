import React from "react";
import './TransactionCard.css';

let TransactionCard = ({ id, price, description, date, type }) => {

  //Format negative sign for withdrawals
  if(type === "withdrawal") {
    let temp = price * -1;
    price = `-$${temp}`;
  }
  else {
    price = `+$${price}`
  }

  //Format date
  const dateObject = new Date(date);
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  date = (month + "/" + day + "/" + year);

  return(
    <div className="cardContainer">
      <div className={`cardPrice ${(type === "deposit") ? "greenBackground" : "redBackground"}`}>  
        <h3>{price}</h3>
      </div>

      <hr />

      <div className="cardBody">
        <h3>{description}</h3>
        <div className="cardBodyRight">
          <p>{date}</p>
          <form action="http://localhost:5000/delete?_method=DELETE" method="POST">
            <input name="id" value={id} type="hidden" />
            <button className="removeBtn">Remove</button>
          </form>
          
        </div>
        
      </div>
    </div>
  );
}

export default TransactionCard;