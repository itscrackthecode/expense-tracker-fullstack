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
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = data
      .filter((t) => t.type === "EXPENSE")
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
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="title-icon">📊</span>
          Financial Dashboard
        </h1>
        <p className="dashboard-subtitle">Track your income and expenses efficiently</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-grid">
          <div className="summary-card income-card">
            <div className="card-icon">📈</div>
            <div className="card-content">
              <h3>Total Income</h3>
              <p className="amount">${summary.income.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="summary-card expense-card">
            <div className="card-icon">📉</div>
            <div className="card-content">
              <h3>Total Expenses</h3>
              <p className="amount">${summary.expense.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="summary-card balance-card">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>Net Balance</h3>
              <p className="amount">${summary.balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Add Transaction Form */}
        <div className="dashboard-section">
          <AddExpense onAdd={handleAddTransaction} />
        </div>

        {/* Chart Placeholder */}
        <div className="dashboard-section chart-section">
          <div className="section-header">
            <h3>
              <span className="section-icon">📊</span>
              Financial Overview
            </h3>
          </div>
          <div className="chart-placeholder">
            <div className="chart-content">
              <div className="chart-mock">
                <div className="bar income-bar" style={{height: `${Math.min((summary.income / Math.max(summary.income, summary.expense)) * 100, 100)}%`}}></div>
                <div className="bar expense-bar" style={{height: `${Math.min((summary.expense / Math.max(summary.income, summary.expense)) * 100, 100)}%`}}></div>
              </div>
              <div className="chart-labels">
                <span className="chart-label income-label">Income</span>
                <span className="chart-label expense-label">Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="dashboard-section transactions-section">
          <div className="section-header">
            <h3>
              <span className="section-icon">📝</span>
              Recent Transactions
            </h3>
            <span className="transaction-count">{transactions.length} total</span>
          </div>
          
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colspan="4" className="no-data">
                      <div className="empty-state">
                        <span className="empty-icon">📋</span>
                        <p>No transactions yet</p>
                        <small>Add your first transaction to get started</small>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 10).map((t, index) => (
                    <tr key={t.id || index}>
                      <td>
                        <span className={`type-badge ${t.type === "INCOME" ? "income-badge" : "expense-badge"}`}>
                          {t.type === "INCOME" ? "📈" : "📉"} {t.type}
                        </span>
                      </td>
                      <td className="category-cell">{t.category}</td>
                      <td className="description-cell">{t.description || "No description"}</td>
                      <td className={`amount-cell ${t.type === "INCOME" ? "income-amount" : "expense-amount"}`}>
                        ${t.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
