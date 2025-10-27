const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Helper to validate incoming expense payload
function validateExpensePayload({ title, amount, category, date }) {
  const errors = [];
  if (!title || typeof title !== 'string' || !title.trim()) errors.push('title is required');
  if (amount === undefined || amount === null || isNaN(Number(amount))) errors.push('amount must be a number');
  if (!category || typeof category !== 'string' || !category.trim()) errors.push('category is required');
  if (!date || isNaN(new Date(date).getTime())) errors.push('date must be a valid date');
  return errors;
}

// Helper to format expense object for response
function formatExpense(expense) {
  if (!expense) return null;
  
  // Convert Mongoose document to plain object and ensure id field
  const expenseObj = expense.toObject ? expense.toObject() : expense;
  
  // Map _id to id if needed
  if (expenseObj._id && !expenseObj.id) {
    expenseObj.id = expenseObj._id.toString();
    delete expenseObj._id;
  }
  
  return expenseObj;
}

// POST /api/expenses - create new expense
router.post('/', async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;
    const errors = validateExpensePayload({ title, amount, category, date });
    if (errors.length) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const expense = new Expense({ title: title.trim(), amount: Number(amount), category: category.trim(), date: new Date(date) });
    const created = await expense.save();
    return res.status(201).json(formatExpense(created));
  } catch (err) {
    next(err);
  }
});

// GET /api/expenses - all expenses sorted by date desc
router.get('/', async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses.map(formatExpense));
  } catch (err) {
    next(err);
  }
});

// GET /api/expenses/:id - single expense
router.get('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(formatExpense(expense));
  } catch (err) {
    next(err);
  }
});

// PUT /api/expenses/:id - update
router.put('/:id', async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (amount !== undefined) updateFields.amount = amount;
    if (category !== undefined) updateFields.category = category;
    if (date !== undefined) updateFields.date = date;

    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // apply updates with basic validation
    const errors = validateExpensePayload({
      title: updateFields.title ?? expense.title,
      amount: updateFields.amount ?? expense.amount,
      category: updateFields.category ?? expense.category,
      date: updateFields.date ?? expense.date,
    });
    if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

    expense.title = (updateFields.title ?? expense.title).trim();
    expense.amount = Number(updateFields.amount ?? expense.amount);
    expense.category = (updateFields.category ?? expense.category).trim();
    expense.date = new Date(updateFields.date ?? expense.date);

    const saved = await expense.save();
    res.json(formatExpense(saved));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/expenses/:id - remove
router.delete('/:id', async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    await expense.deleteOne();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;