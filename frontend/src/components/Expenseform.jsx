import React, { useState } from "react";
import axios from "axios";

function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME"); // default

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://expensebackend-2zgp.onrender.com/api/transactions", {
        title,
        amount,
        type,
      });
      alert("Expense added!");
      setTitle("");
      setAmount("");
      setType("INCOME");
      // optionally reload list
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded">
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
