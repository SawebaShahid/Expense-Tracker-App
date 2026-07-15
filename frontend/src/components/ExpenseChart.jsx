import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const data = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expense",
      value: expense,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Income vs Expense
      </h2>

      {income === 0 && expense === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={110}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}

export default ExpenseChart;