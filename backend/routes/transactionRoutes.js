const express = require("express");

const router = express.Router();

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

// Get All
router.get("/", getTransactions);

// Add
router.post("/", addTransaction);

// Update
router.put("/:id", updateTransaction);

// Delete
router.delete("/:id", deleteTransaction);

module.exports = router;