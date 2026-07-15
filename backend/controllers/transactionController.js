const Transaction = require("../models/Transaction");

// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      createdAt: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};