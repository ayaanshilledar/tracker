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
    return apiRequest('/api/expenses');
  },

  // Get expense by ID
  getById: (id: string): Promise<Expense> => {
    return apiRequest(`/api/expenses/${id}`);
  },

  // Create new expense
  create: (expense: Omit<Expense, 'id'>): Promise<Expense> => {
    return apiRequest('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    });
  },

  // Update expense
  update: (id: string, expense: Partial<Expense>): Promise<Expense> => {
    return apiRequest(`/api/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expense),
    });
  },

  // Delete expense
  delete: (id: string): Promise<void> => {
    return apiRequest(`/api/expenses/${id}`, {
      method: 'DELETE',
    });
  },
};