import React from "react";
import './App.css';
import NavBar from "./NavBar";
import Home from "./Home";
import Withdrawals from "./Withdrawals";
import Deposits from "./Deposits";
import AllTransactions from "./AllTransactions";
import New from "./New";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/withdrawals" element={<Withdrawals />} />
        <Route path="/deposits" element={<Deposits />} />
        <Route path="/transactions" element={<AllTransactions />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </Router>
  );
}

export default App;
