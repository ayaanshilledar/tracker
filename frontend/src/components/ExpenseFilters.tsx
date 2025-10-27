import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/types/expense';
import { Filter } from 'lucide-react';

interface ExpenseFiltersProps {
  selectedCategory: string;
  dateFilter: string;
  onCategoryChange: (category: string) => void;
  onDateChange: (date: string) => void;
}

export const ExpenseFilters = ({
  selectedCategory,
  dateFilter,
  onCategoryChange,
  onDateChange,
}: ExpenseFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Month</Label>
            <Input
              type="month"
              value={dateFilter}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
