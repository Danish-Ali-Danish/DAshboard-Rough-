
import React, { useState, useMemo } from 'react';
import { Order, OrderStatus } from '../types';
import { CloseIcon } from '../constants';

const getStatusClass = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Pending: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case OrderStatus.Shipped: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case OrderStatus.Delivered: return 'bg-emerald/20 text-emerald border-emerald/30';
        case OrderStatus.Cancelled: return 'bg-red-500/20 text-red-400 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

interface OrderDetailDrawerProps {
    order: Order | null;
    onClose: () => void;
    onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({ order, onClose, onUpdateStatus }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}>
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-graphite shadow-lg transform transition-transform duration-300 ease-in-out" 
                onClick={e => e.stopPropagation()}
                style={{ transform: order ? 'translateX(0)' : 'translateX(100%)' }}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-graphite/50 pb-4">
                        <h2 className="text-2xl font-display text-gold">Order Details</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-deep-black">
                            <CloseIcon className="w-6 h-6 text-gray-600 dark:text-platinum" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto mt-6 space-y-6 pr-2">
                        <div className="flex justify-between items-center">
                            <p className="font-mono text-lg text-gold">{order.id}</p>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-platinum mb-2">Customer Info</h3>
                            <div className="text-sm bg-gray-100 dark:bg-deep-black/50 p-4 rounded-lg">
                                <p>{order.customer.name}</p>
                                <p className="text-gray-500 dark:text-gray-400">{order.customer.email}</p>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">{order.customer.address}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-platinum mb-2">Ordered Items</h3>
                            <ul className="space-y-3">
                                {order.items.map(item => (
                                    <li key={item.id} className="flex items-center gap-4 bg-gray-100 dark:bg-deep-black/50 p-2 rounded-lg">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-platinum mb-2">Payment & Shipping</h3>
                             <div className="text-sm bg-gray-100 dark:bg-deep-black/50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between"><span>Payment Method:</span> <span>{order.paymentMethod}</span></div>
                                <div className="flex justify-between"><span>Subtotal:</span> <span>${(order.amount).toFixed(2)}</span></div>
                                <div className="flex justify-between font-bold text-gold text-base"><span>Total:</span> <span>${order.amount.toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-graphite/50 pt-4 mt-auto">
                        <label htmlFor="status-update" className="text-sm text-gray-600 dark:text-platinum">Update Status</label>
                        <div className="flex gap-4 mt-2">
                            <select 
                                id="status-update"
                                value={order.status}
                                onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                                className="w-full bg-gray-100 dark:bg-deep-black p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold"
                            >
                                {Object.values(OrderStatus).map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                             <button className="px-5 py-2 whitespace-nowrap rounded-lg text-deep-black bg-gold-gradient font-semibold hover:brightness-125 transition-all duration-300 transform hover:scale-105 shadow-gold-glow">Generate Invoice</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface OrdersPageProps {
    searchTerm: string;
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ searchTerm, orders, setOrders }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };
    
    const filteredOrders = useMemo(() => {
        let tempOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);
        
        if (!searchTerm) return tempOrders;

        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k);
        return tempOrders.filter(order => {
            const searchableString = `${order.id} ${order.customer.name} ${order.customer.email}`.toLowerCase();
            return searchKeywords.every(keyword => searchableString.includes(keyword));
        });
    }, [orders, filter, searchTerm]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Orders Management</h1>
                <div className="flex items-center gap-4">
                    <label htmlFor="status-filter" className="text-gray-600 dark:text-platinum">Filter by status:</label>
                    <select 
                        id="status-filter"
                        value={filter}
                        onChange={e => setFilter(e.target.value as OrderStatus | 'All')}
                        className="bg-white dark:bg-graphite p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                        <option value="All">All</option>
                        {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-graphite/80">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
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
                                    <td className="p-4">
                                        <button onClick={() => setSelectedOrder(order)} className="text-gray-500 dark:text-platinum hover:text-gold transition">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <OrderDetailDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={handleUpdateStatus} />
        </div>
    );
};

export default OrdersPage;
