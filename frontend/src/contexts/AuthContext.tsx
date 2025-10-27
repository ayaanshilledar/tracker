import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Mock signup - store credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In production, this would be hashed
        name,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Create mock JWT token
      const token = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
      localStorage.setItem('token', token);
      
      const userWithoutPassword = { id: newUser.id, email: newUser.email, name: newUser.name };
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Create mock JWT token
      const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
      localStorage.setItem('token', token);
      
      const userWithoutPassword = { id: user.id, email: user.email, name: user.name };
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
