import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Plus, TrendingUp, Wallet } from 'lucide-react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseChart } from '@/components/ExpenseChart';
import { ExpenseFilters } from '@/components/ExpenseFilters';
import { Expense, CATEGORIES } from '@/types/expense';
import { toast } from 'sonner';
import { expenseApi } from '@/services/api';

type ExpenseFormData = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, [user]);

  const loadExpenses = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await expenseApi.getAll();
      setExpenses(data);
    } catch (error) {
      toast.error('Failed to load expenses');
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: ExpenseFormData) => {
    if (!user) return;
    try {
      const newExpense = await expenseApi.create({
        ...expense,
        userId: user.id,
      });
      setExpenses(prev => [newExpense, ...prev]);
      toast.success('Expense added successfully');
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  const updateExpense = async (id: string, updates: ExpenseFormData) => {
    try {
      const updatedExpense = await expenseApi.update(id, updates);
      setExpenses(prev => prev.map(exp => exp.id === id ? updatedExpense : exp));
      toast.success('Expense updated successfully');
      setEditingExpense(null);
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to update expense');
      console.error('Error updating expense:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await expenseApi.delete(id);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error('Failed to delete expense');
      console.error('Error deleting expense:', error);
    }
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesDate = !dateFilter || exp.date.startsWith(dateFilter);
    return matchesCategory && matchesDate;
  });

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = CATEGORIES.reduce((acc, category) => {
    acc[category] = filteredExpenses
      .filter((exp) => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                ${totalExpenses.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredExpenses.length} transactions
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsFormOpen(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </div>

        <ExpenseChart categoryTotals={categoryTotals} />

        <ExpenseFilters
          selectedCategory={selectedCategory}
          dateFilter={dateFilter}
          onCategoryChange={setSelectedCategory}
          onDateChange={setDateFilter}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onEdit={(expense) => {
            setEditingExpense(expense);
            setIsFormOpen(true);
          }}
          onDelete={deleteExpense}
        />

        <ExpenseForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingExpense(null);
          }}
          onSubmit={(data: ExpenseFormData) => {
            if (editingExpense) {
              updateExpense(editingExpense.id, data);
            } else {
              addExpense(data);
            }
          }}
          initialData={editingExpense || undefined}
        />
      </main>
    </div>
  );
};

export default Dashboard;
