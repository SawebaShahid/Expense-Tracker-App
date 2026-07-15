import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function TransactionForm({
  fetchTransactions,
  editing,
  setEditing,
}) {
  const incomeCategories = [
    "Salary",
    "Freelancing",
    "Business",
    "Investment",
    "Bonus",
  ];

  const expenseCategories = [
    "Food",
    "Shopping",
    "Bills",
    "Travel",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "Salary",
  });

  useEffect(() => {
    if (editing) {
      setFormData({
        title: editing.title,
        amount: editing.amount,
        type: editing.type,
        category: editing.category,
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        category:
          value === "income"
            ? incomeCategories[0]
            : expenseCategories[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "income",
      category: "Salary",
    });

    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editing) {
        await API.put(
          `/transactions/${editing._id}`,
          formData
        );

        toast.success("Transaction Updated Successfully");
      } else {
        await API.post(
          "/transactions",
          formData
        );

        toast.success("Transaction Added Successfully");
      }

      resetForm();
      fetchTransactions();

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const categories =
    formData.type === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-indigo-600 mb-6">

        {editing
          ? "✏️ Edit Transaction"
          : "➕ Add Transaction"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Transaction Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <div className="flex gap-3">

          <button
            type="submit"
            className={`flex-1 text-white p-3 rounded-xl transition ${
              editing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {editing
              ? "Update Transaction"
              : "Add Transaction"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 rounded-xl"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}

export default TransactionForm;