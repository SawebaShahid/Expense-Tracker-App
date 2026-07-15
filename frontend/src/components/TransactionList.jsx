import { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import API from "../services/api";

function TransactionList({
  transactions,
  fetchTransactions,
  setEditing,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const deleteTransaction = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/transactions/${id}`);

      toast.success("Transaction Deleted Successfully!");

      fetchTransactions();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Transaction History
        </h2>

        <input
          type="text"
          placeholder="🔍 Search Transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-3 w-full md:w-72 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      <div className="flex gap-3 mb-6 flex-wrap">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("income")}
          className={`px-4 py-2 rounded-lg ${
            filter === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Income
        </button>

        <button
          onClick={() => setFilter("expense")}
          className={`px-4 py-2 rounded-lg ${
            filter === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Expense
        </button>

      </div>

      <div className="space-y-4">

        {filteredTransactions.length === 0 ? (

          <div className="text-center py-12">

            <div className="text-6xl">
              📂
            </div>

            <h2 className="text-2xl font-bold mt-4">
              No Transactions Found
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first transaction.
            </p>

          </div>

        ) : (

          filteredTransactions.map((transaction) => (

            <div
              key={transaction._id}
              className="flex flex-col md:flex-row justify-between items-center border rounded-2xl p-5 hover:shadow-xl transition"
            >

              <div className="w-full">

                <h3 className="text-xl font-bold text-gray-800">
                  {transaction.title}
                </h3>

                <div className="flex gap-2 mt-3 flex-wrap">

                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {transaction.category}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      transaction.type === "income"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {transaction.type}
                  </span>

                </div>

                <p className="text-gray-400 mt-2 text-sm">
                  {new Date(transaction.date).toLocaleDateString("en-GB")}
                </p>

              </div>

              <div className="text-right mt-5 md:mt-0">

                <h2
                  className={`text-2xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {Number(transaction.amount).toLocaleString()}
                </h2>

                <div className="flex gap-3 justify-end mt-4">

                  <button
                    onClick={() => setEditing(transaction)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTransaction(transaction._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default TransactionList;