import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MOCK_SALES_DATA, MOCK_TRANSACTIONS, MOCK_EXPENSES, CloseIcon, PlusIcon, EditIcon, DeleteIcon, TrendingUpIcon, TrendingDownIcon } from '../constants';
import { Transaction, TransactionType, TransactionStatus, Expense, ExpenseCategory } from '../types';

type Theme = 'light' | 'dark';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const KPICard: React.FC<{ title: string; value: string; description?: string; icon?: React.ReactNode }> = ({ title, value, description, icon }) => (
    <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-gold-glow dark:hover:border-gold/30 transition-all duration-300">
        <div className="flex justify-between items-start">
            <h3 className="text-gray-600 dark:text-platinum text-md font-medium">{title}</h3>
            {icon}
        </div>
        <p className="text-4xl font-display text-gray-900 dark:text-white my-3">{value}</p>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
);

const ChartContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-gold-glow dark:hover:border-gold/30 transition-all duration-300">
        <h3 className="text-xl font-display text-gold mb-4">{title}</h3>
        <div style={{ width: '100%', height: 350 }}>
            {children}
        </div>
    </div>
);

// TAB: Overview
const FinancialsOverview: React.FC<{ theme: Theme }> = ({ theme }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <KPICard title="Net Profit" value="$356,821" description="+12.5% from last month" />
            <KPICard title="Total Refunds" value="$12,450" description="-5.2% from last month" />
            <KPICard title="Average Order Value" value="$2,890" description="+2.1% from last month" />
        </div>
        <ChartContainer title="Revenue Breakdown by Vendor">
            <ResponsiveContainer>
                 <BarChart data={[ { name: 'Rolex', revenue: 150000 }, { name: 'Tissot', revenue: 95000 }, { name: 'Patek Philippe', revenue: 210000 }, { name: 'Casio', revenue: 45000 } ]}>
                    <XAxis dataKey="name" stroke={theme === 'dark' ? '#C0C0C0' : '#6B7280'} />
                    <YAxis stroke={theme === 'dark' ? '#C0C0C0' : '#6B7280'} />
                    <Tooltip cursor={{fill: theme === 'dark' ? '#ffffff10' : '#00000005'}} contentStyle={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF', border: '1px solid #D4AF37' }} />
                    <Bar dataKey="revenue" fill="#D4AF37" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
);

// TAB: Transactions
const TransactionsList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const getTypeClass = (type: TransactionType) => ({
        [TransactionType.Sale]: 'bg-emerald/20 text-emerald',
        [TransactionType.Refund]: 'bg-yellow-500/20 text-yellow-400',
        [TransactionType.Payout]: 'bg-blue-500/20 text-blue-400',
        [TransactionType.Expense]: 'bg-red-500/20 text-red-400',
    }[type]);

    return (
        <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
            <table className="w-full text-left">
                <thead><tr className="border-b border-gray-200 dark:border-graphite/80"><th className="p-4">Transaction ID</th><th className="p-4">Date</th><th className="p-4">Type</th><th className="p-4">Description</th><th className="p-4">Amount</th><th className="p-4">Status</th></tr></thead>
                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-deep-black/30">
                            <td className="p-4 font-mono text-sm text-gray-500">{t.id}</td>
                            <td className="p-4">{t.date}</td>
                            <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeClass(t.type)}`}>{t.type}</span></td>
                            <td className="p-4">{t.description}</td>
                            <td className={`p-4 font-semibold ${t.amount > 0 ? 'text-emerald' : 'text-red-400'}`}>{formatCurrency(t.amount)}</td>
                            <td className="p-4 text-sm">{t.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// TAB: Expenses
const ExpenseModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (expense: Expense) => void; expense: Expense | null }> = ({ isOpen, onClose, onSave, expense }) => {
    const [formData, setFormData] = useState<Partial<Expense>>(expense || {});

    React.useEffect(() => {
        setFormData(expense || { date: new Date().toISOString().split('T')[0], category: ExpenseCategory.Other, amount: 0, description: '' });
    }, [expense]);

    if (!isOpen) return null;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(p => ({...p, [e.target.name]: e.target.value}));

    const handleSave = () => onSave({...formData, amount: parseFloat(String(formData.amount)) || 0 } as Expense);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-graphite w-full max-w-lg rounded-xl shadow-gold-glow-strong p-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-display text-gold mb-6">{expense ? 'Edit Expense' : 'Add New Expense'}</h2>
                <div className="space-y-4">
                    <div><label>Date</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" /></div>
                    <div><label>Category</label><select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite">{Object.values(ExpenseCategory).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div><label>Amount</label><input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" /></div>
                    <div><label>Description</label><input name="description" value={formData.description} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" /></div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-deep-black">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold">Save Expense</button>
                </div>
            </div>
        </div>
    );
};

const ExpensesManager: React.FC<{ expenses: Expense[], onAdd: () => void, onEdit: (expense: Expense) => void, onDelete: (id: string) => void }> = ({ expenses, onAdd, onEdit, onDelete }) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display text-gold">Operational Expenses</h2>
            <button onClick={onAdd} className="px-4 py-2 flex items-center gap-2 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 shadow-gold-glow"><PlusIcon className="w-5 h-5" /> Add Expense</button>
        </div>
        <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
            <table className="w-full text-left">
                <thead><tr className="border-b border-gray-200 dark:border-graphite/80"><th className="p-4">Date</th><th className="p-4">Category</th><th className="p-4">Description</th><th className="p-4">Amount</th><th className="p-4">Actions</th></tr></thead>
                <tbody>
                    {expenses.map(e => (
                        <tr key={e.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-deep-black/30">
                            <td className="p-4">{e.date}</td>
                            <td className="p-4">{e.category}</td>
                            <td className="p-4">{e.description}</td>
                            <td className="p-4 font-semibold">{formatCurrency(e.amount)}</td>
                            <td className="p-4 space-x-4"><button onClick={() => onEdit(e)} className="text-gray-500 hover:text-gold"><EditIcon className="w-5 h-5"/></button><button onClick={() => onDelete(e.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// TAB: Profit & Loss
const ProfitLossStatement: React.FC<{ transactions: Transaction[]; expenses: Expense[]; theme: Theme }> = ({ transactions, expenses, theme }) => {
    const totalRevenue = useMemo(() => transactions.filter(t => t.type === TransactionType.Sale).reduce((sum, t) => sum + t.amount, 0), [transactions]);
    const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
    const netProfit = totalRevenue - totalExpenses;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <KPICard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={<TrendingUpIcon className="w-8 h-8 text-emerald" />} />
                <KPICard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={<TrendingDownIcon className="w-8 h-8 text-red-400" />} />
                <KPICard title="Net Profit" value={formatCurrency(netProfit)} icon={<span className={`text-4xl ${netProfit > 0 ? 'text-emerald' : 'text-red-400'}`}>{netProfit > 0 ? '▲' : '▼'}</span>} />
            </div>
             <ChartContainer title="Monthly Revenue vs. Expenses">
                <ResponsiveContainer>
                     <BarChart data={MOCK_SALES_DATA}>
                        <XAxis dataKey="name" stroke={theme === 'dark' ? '#C0C0C0' : '#6B7280'} />
                        <YAxis stroke={theme === 'dark' ? '#C0C0C0' : '#6B7280'} />
                        <Tooltip cursor={{fill: theme === 'dark' ? '#ffffff10' : '#00000005'}} contentStyle={{ backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFFFFF', border: '1px solid #D4AF37' }} formatter={(value: number) => formatCurrency(value)}/>
                        <Legend />
                        <Bar dataKey="sales" fill="#D4AF37" name="Revenue" />
                        <Bar dataKey="expenses" fill="#F87171" name="Expenses" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};


// Main Component
const FinancialsPage: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [expenses, setExpenses] = useState(MOCK_EXPENSES);
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

    const handleOpenExpenseModal = (expense: Expense | null = null) => {
        setSelectedExpense(expense);
        setIsExpenseModalOpen(true);
    };
    
    const handleSaveExpense = (expenseData: Expense) => {
        if (selectedExpense) {
            setExpenses(expenses.map(e => e.id === selectedExpense.id ? { ...e, ...expenseData } : e));
        } else {
            setExpenses([...expenses, { ...expenseData, id: `EXP-${Date.now()}` }]);
        }
        setIsExpenseModalOpen(false);
    };

    const handleDeleteExpense = (id: string) => setExpenses(expenses.filter(e => e.id !== id));
    
    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <FinancialsOverview theme={theme} />;
            case 'transactions': return <TransactionsList transactions={transactions} />;
            case 'expenses': return <ExpensesManager expenses={expenses} onAdd={() => handleOpenExpenseModal()} onEdit={handleOpenExpenseModal} onDelete={handleDeleteExpense} />;
            case 'pnl': return <ProfitLossStatement transactions={transactions} expenses={expenses} theme={theme} />;
            default: return <FinancialsOverview theme={theme} />;
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-display text-gold">Financials & Reports</h1>
            <div className="bg-white dark:bg-graphite p-2 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <div className="flex border-b border-gray-200 dark:border-graphite/50">
                    <button onClick={() => setActiveTab('overview')} className={`px-6 py-2 transition ${activeTab === 'overview' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Overview</button>
                    <button onClick={() => setActiveTab('transactions')} className={`px-6 py-2 transition ${activeTab === 'transactions' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Transactions</button>
                    <button onClick={() => setActiveTab('expenses')} className={`px-6 py-2 transition ${activeTab === 'expenses' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Expenses</button>
                    <button onClick={() => setActiveTab('pnl')} className={`px-6 py-2 transition ${activeTab === 'pnl' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Profit & Loss</button>
                </div>
                <div className="p-6">{renderContent()}</div>
            </div>
            <ExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} onSave={handleSaveExpense} expense={selectedExpense} />
        </div>
    );
};

export default FinancialsPage;
