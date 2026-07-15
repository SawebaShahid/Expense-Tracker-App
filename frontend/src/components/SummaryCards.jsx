import {
  FaArrowUp,
  FaArrowDown,
  FaList,
} from "react-icons/fa";

function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">

      <div className="bg-white rounded-2xl shadow p-6">

        <FaArrowUp
          className="text-green-600"
          size={30}
        />

        <h2 className="mt-4 text-gray-500">
          Total Income
        </h2>

        <h1 className="text-3xl font-bold text-green-600">
          ₹ {income.toLocaleString()}
        </h1>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <FaArrowDown
          className="text-red-600"
          size={30}
        />

        <h2 className="mt-4 text-gray-500">
          Total Expense
        </h2>

        <h1 className="text-3xl font-bold text-red-600">
          ₹ {expense.toLocaleString()}
        </h1>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <FaList
          className="text-indigo-600"
          size={30}
        />

        <h2 className="mt-4 text-gray-500">
          Transactions
        </h2>

        <h1 className="text-3xl font-bold">
          {transactions.length}
        </h1>

      </div>

    </div>
  );
}

export default SummaryCards;