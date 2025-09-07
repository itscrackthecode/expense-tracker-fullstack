import React from "react";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";

function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default Home;
