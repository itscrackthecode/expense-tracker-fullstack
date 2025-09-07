// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";
import "../styles/style.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/transactions");
      setTransactions(response.data);
      calculateSummary(response.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate income, expense, and balance
  const calculateSummary = (data) => {
    const income = data
      .filter(t => t.type === "INCOME")
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = data
      .filter(t => t.type === "EXPENSE")
      .reduce((acc, t) => acc + t.amount, 0);
    setSummary({
      income,
      expense,
      balance: income - expense,
    });
  };

  // Add new transaction
  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    calculateSummary(updatedTransactions);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-logo">Expense Tracker</div>
        <div>
          <a className="navbar-link" href="#">Dashboard</a>
          <a className="navbar-link" href="#">Reports</a>
        </div>
      </div>

      {/* Dashboard Wrapper */}
      <div className="dashboard-wrapper">
        <h1 className="dashboard-title">My Dashboard</h1>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card income-card">
            <h3>Income</h3>
            <p>${summary.income.toFixed(2)}</p>
          </div>
          <div className="card expense-card">
            <h3>Expense</h3>
            <p>${summary.expense.toFixed(2)}</p>
          </div>
          <div className="card balance-card">
            <h3>Balance</h3>
            <p>${summary.balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="charts-container">
          <div className="chart-box">
            <h3>Monthly Summary Chart</h3>
            <p>(Chart goes here)</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="transaction-list">
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.type}</td>
                  <td>{t.category}</td>
                  <td>{t.description || "-"}</td>
                  <td>{t.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Expense Form */}
        <AddExpense onAdd={handleAddTransaction} />
      </div>
    </div>
  );
}

export default Dashboard;
