import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseChart";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Footer from "../components/Footer";

import API from "../services/api";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-8">

          <Header />

          <BalanceCard transactions={transactions} />

          <SummaryCards transactions={transactions} />

          <div className="grid lg:grid-cols-2 gap-8 mt-8">

            <TransactionForm
              fetchTransactions={fetchTransactions}
              editing={editing}
              setEditing={setEditing}
            />

            <ExpenseChart
              transactions={transactions}
            />

          </div>

          <div className="mt-8">

            <TransactionList
              transactions={transactions}
              fetchTransactions={fetchTransactions}
              setEditing={setEditing}
            />

          </div>

        </main>

        <Footer />

      </div>

    </div>
  );
}

export default Dashboard;