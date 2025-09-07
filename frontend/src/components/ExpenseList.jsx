import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpenseList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://expensebackend-2zgp.onrender.com/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2">Your Expenses</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className="flex justify-between border-b p-2">
            <span>{t.title} ({t.type})</span>
            <span>${t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
