import React, { useState } from "react";
import axios from "axios";
import '../styles/style.css';

function AddExpense({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("EXPENSE"); // Default is EXPENSE
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const response = await axios.post("https://expensebackend-2zgp.onrender.com/api/transactions", {
        amount: parseFloat(amount),
        category,
        type,
        description
      });

      setAmount("");
      setCategory("");
      setType("EXPENSE");
      setDescription("");
      onAdd(response.data); // update dashboard
      alert("Transaction added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding transaction");
    }
  };

  return (
    <div className="add-expense-wrapper">
      <h2>
        <span className="section-icon">💳</span>
        Add New Transaction
      </h2>
      <form onSubmit={handleSubmit} className="add-expense-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="EXPENSE">💸 Expense</option>
          <option value="INCOME">💰 Income</option>
        </select>

        <input
          type="text"
          placeholder="Category (e.g., Food, Transportation)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          ➕ Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
