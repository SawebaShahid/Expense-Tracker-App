import { FaWallet } from "react-icons/fa";

function BalanceCard({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = income - expense;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl p-8 mt-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-lg opacity-80">
            Current Balance
          </p>

          <h1 className="text-5xl font-bold mt-2">
            ₹ {balance.toLocaleString()}
          </h1>

        </div>

        <FaWallet size={55} />

      </div>

    </div>
  );
}

export default BalanceCard;