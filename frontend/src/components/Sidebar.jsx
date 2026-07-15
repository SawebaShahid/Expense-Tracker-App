import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaChartBar
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex-col min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-12">
        💰 Expense Tracker
      </h1>

      <nav className="space-y-4">

        <div className="bg-white/20 p-4 rounded-xl flex items-center gap-3 cursor-pointer">
          <FaChartPie />
          Dashboard
        </div>

        <div className="hover:bg-white/10 transition p-4 rounded-xl flex items-center gap-3 cursor-pointer">
          <FaMoneyBillWave />
          Transactions
        </div>

        <div className="hover:bg-white/10 transition p-4 rounded-xl flex items-center gap-3 cursor-pointer">
          <FaChartBar />
          Analytics
        </div>

        <div className="hover:bg-white/10 transition p-4 rounded-xl flex items-center gap-3 cursor-pointer">
          <FaWallet />
          Reports
        </div>

      </nav>

      <div className="mt-auto text-center text-indigo-200 text-sm">

        Developed by

        <br />

        <span className="font-semibold">
          saweba
        </span>

      </div>

    </aside>
  );
}

export default Sidebar;