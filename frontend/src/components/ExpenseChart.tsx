import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(160 60% 50%)',
  'hsl(180 60% 50%)',
];

interface ExpenseChartProps {
  categoryTotals: Record<string, number>;
}

export const ExpenseChart = ({ categoryTotals }: ExpenseChartProps) => {
  const data = Object.entries(categoryTotals)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No data available for chart</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {Object.entries(categoryTotals)
            .filter(([, value]) => value > 0)
            .map(([category, total]) => (
              <div key={category} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                <span className="font-medium">{category}:</span>
                <span className="text-primary font-semibold">${total.toFixed(2)}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
