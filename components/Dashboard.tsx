
import React, { useEffect, useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MOCK_METRICS, MOCK_SALES_DATA, MOCK_CATEGORY_DATA, MOCK_TOP_PRODUCTS_DATA } from '../constants';
import { Order, OrderStatus } from '../types';

type Theme = 'light' | 'dark';

const useAnimatedCounter = (targetValue: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = targetValue;
    if (start === end) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration]);
  
  return count;
};

interface MetricCardProps {
    title: string;
    value: number;
    progress: number;
    format: 'currency' | 'number';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, progress, format }) => {
    const animatedValue = useAnimatedCounter(value);
    const formattedValue = format === 'currency' 
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(animatedValue)
        : new Intl.NumberFormat('en-US').format(animatedValue);

    return (
        <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-gold-glow dark:hover:border-gold/30 transition-all duration-300">
            <h3 className="text-gray-600 dark:text-platinum text-md font-medium">{title}</h3>
            <p className="text-4xl font-display text-gray-900 dark:text-white my-3">{formattedValue}</p>
            <div className="w-full bg-gray-200 dark:bg-deep-black rounded-full h-2">
                <div 
                    className="bg-gold-gradient h-2 rounded-full" 
                    style={{ width: `${progress}%`, transition: 'width 1.5s ease-in-out' }}
                ></div>
            </div>
        </div>
    );
};

const ChartContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-gold-glow dark:hover:border-gold/30 transition-all duration-300">
        <h3 className="text-xl font-display text-gold mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            {children}
        </div>
    </div>
);

const SalesLineChart: React.FC<{ theme: Theme }> = ({ theme }) => {
    const axisColor = theme === 'dark' ? '#C0C0C0' : '#6B7280';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
        border: '1px solid #D4AF37',
        color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
    };
    return (
        <ChartContainer title="Sales Trends">
            <ResponsiveContainer>
                <LineChart data={MOCK_SALES_DATA}>
                    <XAxis dataKey="name" stroke={axisColor} />
                    <YAxis stroke={axisColor} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8, style: { stroke: '#fff', strokeWidth: 2 } }} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

const CategoryDonutChart: React.FC<{ theme: Theme }> = ({ theme }) => {
    const COLORS = ['#D4AF37', theme === 'dark' ? '#C0C0C0' : '#A0A0A0', '#A97142'];
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
        border: '1px solid #D4AF37',
        color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
    };
    return (
        <ChartContainer title="Category Distribution">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={MOCK_CATEGORY_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {MOCK_CATEGORY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

const TopProductsBarChart: React.FC<{ theme: Theme }> = ({ theme }) => {
    const axisColor = theme === 'dark' ? '#C0C0C0' : '#6B7280';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
        border: '1px solid #D4AF37',
        color: theme === 'dark' ? '#FFFFFF' : '#1A1A1A',
    };
    return (
        <ChartContainer title="Top 5 Selling Items">
            <ResponsiveContainer>
                <BarChart data={MOCK_TOP_PRODUCTS_DATA} layout="vertical">
                    <XAxis type="number" stroke={axisColor} />
                    <YAxis type="category" dataKey="name" stroke={axisColor} width={80} />
                    <Tooltip cursor={{fill: theme === 'dark' ? '#ffffff10' : '#00000005'}} contentStyle={tooltipStyle} />
                    <Bar dataKey="sales" fill="#D4AF37" background={{ fill: theme === 'dark' ? '#ffffff05' : '#00000005' }} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

const RecentOrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
    const getStatusClass = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Pending: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
            case OrderStatus.Shipped: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case OrderStatus.Delivered: return 'bg-emerald/20 text-emerald border-emerald/30';
            case OrderStatus.Cancelled: return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark mt-8 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-display text-gold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(0, 5).map((order: Order) => (
                            <tr key={order.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent transition-colors">
                                <td className="p-4 font-mono text-gold">{order.id}</td>
                                <td className="p-4">{order.customer.name}</td>
                                <td className="p-4">${order.amount.toFixed(2)}</td>
                                <td className="p-4">{order.date}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface DashboardPageProps {
    orders: Order[];
    theme: Theme;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ orders, theme }) => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_METRICS.map(metric => <MetricCard key={metric.title} {...metric} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SalesLineChart theme={theme} />
                </div>
                <div>
                    <CategoryDonutChart theme={theme} />
                </div>
            </div>
            <div className="grid grid-cols-1">
                <TopProductsBarChart theme={theme} />
            </div>
            <RecentOrdersTable orders={orders} />
        </div>
    );
};

export default DashboardPage;
