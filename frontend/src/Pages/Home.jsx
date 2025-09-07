import React from "react";
import ExpenseForm from "../components/Expenseform.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Dashboard from "../components/Dashboard.jsx";

function Home() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side: Form + Transactions */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Transaction</h2>
          <ExpenseForm />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Transactions</h2>
          <ExpenseList />
        </div>
      </div>

      {/* Right Side: Dashboard Summary */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <Dashboard />
      </div>
    </div>





  );
}

export default Home;
