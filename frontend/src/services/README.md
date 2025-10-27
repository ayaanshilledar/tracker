# API Service

This directory contains the API service functions for communicating with the backend.

## Usage

The API service uses the `VITE_API_URL` environment variable to determine the backend URL. If not set, it defaults to `http://localhost:4000`.

## Available Functions

### Health Check
```typescript
import { healthCheck } from '@/services/api';

// Check if the API is running
const status = await healthCheck();
```

### Expense API
```typescript
import { expenseApi } from '@/services/api';

// Get all expenses
const expenses = await expenseApi.getAll();

// Get expense by ID
const expense = await expenseApi.getById('expense-id');

// Create new expense
const newExpense = await expenseApi.create({
  title: 'Groceries',
  amount: 50.00,
  category: 'Food',
  date: '2023-01-01'
});

// Update expense
const updatedExpense = await expenseApi.update('expense-id', {
  title: 'Updated Groceries'
});

// Delete expense
await expenseApi.delete('expense-id');
```

## Environment Variables

Make sure to set the `VITE_API_URL` in your `.env` files:

Development (`.env`):
```
VITE_API_URL=http://localhost:4000
```

Production (`.env.production`):
```
VITE_API_URL=https://your-production-api.com
```