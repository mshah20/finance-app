const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Pool = require('pg').Pool
const pool = new Pool({
  host: process.env.REACT_APP_DB_HOST,
  database: process.env.REACT_APP_DB,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASS,
  port: process.env.REACT_APP_DB_PORT
})

pool.connect(function(error){
  if(error){
    console.log("Error while connecting to database.")
    console.log(error.message);
  }
  else {
    console.log("Connection to database successful.")
  }
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))


app.get('/total', (req, res) => {
  let totalQuery = `SELECT SUM("Amount") FROM "TransactionList"`;

  pool.query(totalQuery, (error, result) => {
    if(!error){
      res.send(result.rows[0].sum)
    }
    else { res.send({ statusCode: 400 }); }
  })
  pool.end;
})

app.get('/recent', (req, res) => {
  let allQuery = `SELECT * FROM "TransactionList" ORDER BY "ID" DESC limit 3`;

  pool.query(allQuery, (error, result) => {
    if(!error){

      const filterData = result.rows.map(transaction => {
        return({
          id: transaction.ID,
          amount: transaction.Amount,
          name: transaction.Name,
          date: transaction.Date,
          type: transaction.Type
        })
      })

      res.send(filterData);
    }
    else { res.send({ statusCode: 400 }); }
  })
  pool.end;
})

app.get('/alltransactions', (req, res) => {
  let allQuery = `SELECT * FROM "TransactionList"`;

  pool.query(allQuery, (error, result) => {
    if(!error){

      const filterData = result.rows.map(transaction => {
        return({
          id: transaction.ID,
          amount: transaction.Amount,
          name: transaction.Name,
          date: transaction.Date,
          type: transaction.Type
        })
      })

      res.send(filterData);
    }
    else { res.send({ statusCode: 400 }); }
  })
  pool.end;
})

app.get('/withdrawals', (req, res) => {
  let allQuery = `SELECT * FROM "TransactionList" WHERE "Type" = 'withdrawal'`;

  pool.query(allQuery, (error, result) => {
    if(!error){

      const filterData = result.rows.map(transaction => {
        return({
          id: transaction.ID,
          amount: transaction.Amount,
          name: transaction.Name,
          date: transaction.Date,
          type: transaction.Type
        })
      })

      res.send(filterData);
    }
    else { res.send({ statusCode: 400 }); }
  })
  pool.end;
})

app.get('/deposits', (req, res) => {
  let allQuery = `SELECT * FROM "TransactionList" WHERE "Type" = 'deposit'`;

  pool.query(allQuery, (error, result) => {
    if(!error){

      const filterData = result.rows.map(transaction => {
        return({
          id: transaction.ID,
          amount: transaction.Amount,
          name: transaction.Name,
          date: transaction.Date,
          type: transaction.Type
        })
      })

      res.send(filterData);
    }
    else { res.send({ statusCode: 400 }); }
  })
  pool.end;
})

app.post('/new', ({ body }, res) => {

  let { name, amount, date, transactionType } = body;

  if(transactionType === "withdrawal"){
    amount = amount * -1;
  }

  try {
  let insertQuery = `INSERT INTO "TransactionList"("Name", "Amount", "Date", "Type") 
    VALUES('${name}', '${amount}', '${date}', '${transactionType}')`;

  pool.query(insertQuery, (error, result) => {
    if(!error){
      res.send({ statusCode: 200 });
    }
    else { res.send({ statusCode: 400 }) }
  })
  pool.end;
}
catch {
  res.send({ statusCode: 400 });
}
});

app.delete('/delete', ({ body }, res) => {

  const { id, value } = body;

  let deleteQuery = `DELETE FROM "TransactionList" WHERE "ID" = '${id}'`;

  pool.query(deleteQuery, (error, result) => {
    if(!error){
      res.redirect('http://localhost:3000/transactions');
    }
    else{ res.send({ statusCode: 400 }); }
})
pool.end;

})

app.listen(5000, () => {console.log("Server started on port 5000")})