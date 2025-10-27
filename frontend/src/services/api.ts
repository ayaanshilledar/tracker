const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${error}`);
    throw error;
  }
}

// Health check
export const healthCheck = (): Promise<{ status: string; timestamp: string }> => {
  return apiRequest('/api/health');
};

// Expense API functions
export const expenseApi = {
  // Get all expenses
  getAll: (): Promise<Expense[]> => {
    return apiRequest<Expense[]>('/api/expenses').then(expenses => 
      expenses.map(expense => {
        // Ensure id field exists and is valid
        const id = expense.id || (expense as any)._id?.toString() || '';
        return {
          ...expense,
          id: id
        };
      }).filter(expense => expense.id && expense.id !== 'undefined')
    );
  },

  // Get expense by ID
  getById: (id: string): Promise<Expense> => {
    return apiRequest<Expense>(`/api/expenses/${id}`).then(expense => {
      const expenseId = expense.id || (expense as any)._id?.toString() || id;
      return {
        ...expense,
        id: expenseId
      };
    });
  },

  // Create new expense
  create: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense> => {
    return apiRequest<Expense>('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    }).then(response => {
      const id = response.id || (response as any)._id?.toString() || '';
      return {
        ...response,
        id: id
      };
    });
  },

  // Update expense
  update: (id: string, expense: Partial<Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Expense> => {
    return apiRequest<Expense>(`/api/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expense),
    }).then(response => {
      const responseId = response.id || (response as any)._id?.toString() || id;
      return {
        ...response,
        id: responseId
      };
    });
  },

  // Delete expense
  delete: (id: string): Promise<void> => {
    // Validate ID before making request
    if (!id || id === 'undefined') {
      return Promise.reject(new Error('Invalid expense ID'));
    }
    return apiRequest<void>(`/api/expenses/${id}`, {
      method: 'DELETE',
    });
  },
};