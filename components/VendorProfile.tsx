

import React, { useState, useMemo } from 'react';
import { Vendor, VendorStatus, Product, Order, Payout } from '../types';
import { MOCK_PAYOUTS } from '../constants';

const getStatusClass = (status: VendorStatus) => {
    switch (status) {
        case VendorStatus.Active: return 'bg-emerald/20 text-emerald border-emerald/30';
        case VendorStatus.Inactive: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case VendorStatus.Suspended: return 'bg-red-500/20 text-red-400 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

const getPayoutStatusClass = (status: 'Completed' | 'Pending' | 'Failed') => {
    switch(status) {
        case 'Completed': return 'bg-emerald/20 text-emerald border-emerald/30';
        case 'Pending': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
}

interface VendorProfilePageProps {
    vendorId: string;
    onBack: () => void;
    vendors: Vendor[];
    setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
    allProducts: Product[];
    allOrders: Order[];
}

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-gray-100 dark:bg-deep-black/50 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
);


const VendorProfilePage: React.FC<VendorProfilePageProps> = ({ vendorId, onBack, vendors, setVendors, allProducts, allOrders }) => {
    const [activeTab, setActiveTab] = useState('products');
    
    const vendor = useMemo(() => vendors.find(v => v.id === vendorId), [vendorId, vendors]);

    const vendorProducts = useMemo(() => allProducts.filter(p => p.vendorId === vendorId), [vendorId, allProducts]);
    const vendorProductIds = useMemo(() => new Set(vendorProducts.map(p => p.id)), [vendorProducts]);
    
    const vendorOrders = useMemo(() => 
        allOrders.filter(order => 
            order.items.some(item => vendorProductIds.has(item.id))
        ), 
    [allOrders, vendorProductIds]);

    const totalRevenue = useMemo(() => 
        vendorOrders.reduce((acc, order) => acc + order.amount, 0),
    [vendorOrders]);
    
    const productsSoldCount = useMemo(() => 
        vendorOrders.reduce((acc, order) => acc + order.items.length, 0),
    [vendorOrders]);

    if (!vendor) {
        return (
            <div className="text-center">
                <p className="text-2xl text-red-500">Vendor not found.</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 rounded bg-gold text-deep-black">Back to list</button>
            </div>
        );
    }
    
    const handleStatusUpdate = (newStatus: VendorStatus) => {
        setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: newStatus } : v));
    };

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="text-gold hover:underline">
                &larr; Back to Vendors List
            </button>

            {/* Header */}
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark flex flex-col md:flex-row items-center gap-6">
                <img src={vendor.logoUrl} alt={vendor.brandName} className="w-24 h-24 rounded-full border-4 border-gold/50" />
                <div className="flex-grow text-center md:text-left">
                    <h1 className="text-4xl font-display text-gold">{vendor.brandName}</h1>
                    <p className="text-gray-600 dark:text-platinum">{vendor.email} | Contact: {vendor.contactPerson}</p>
                    <span className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(vendor.status)}`}>
                        {vendor.status}
                    </span>
                </div>
                <div className="flex gap-4">
                    <StatCard title="Total Revenue" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue)} />
                    <StatCard title="Products Sold" value={productsSoldCount.toString()} />
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <div className="flex border-b border-gray-200 dark:border-graphite/50 mb-6">
                    <button onClick={() => setActiveTab('products')} className={`px-6 py-2 transition ${activeTab === 'products' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Products</button>
                    <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 transition ${activeTab === 'orders' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Orders</button>
                    <button onClick={() => setActiveTab('payouts')} className={`px-6 py-2 transition ${activeTab === 'payouts' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Payouts</button>
                    <button onClick={() => setActiveTab('settings')} className={`px-6 py-2 transition ${activeTab === 'settings' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Settings</button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-2">Name</th><th className="p-2">SKU</th><th className="p-2">Price</th><th className="p-2">Stock</th>
                        </tr></thead>
                        <tbody>{vendorProducts.map(p => (
                            <tr key={p.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent"><td className="p-2 font-semibold">{p.name}</td><td className="p-2 font-mono">{p.sku}</td><td className="p-2">${p.price.toFixed(2)}</td><td className="p-2">{p.stock}</td></tr>
                        ))}</tbody>
                    </table>
                )}
                
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                     <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-2">Order ID</th><th className="p-2">Customer</th><th className="p-2">Amount</th><th className="p-2">Date</th>
                        </tr></thead>
                        <tbody>{vendorOrders.map(o => (
                            <tr key={o.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent"><td className="p-2 font-mono text-gold">{o.id}</td><td className="p-2">{o.customer.name}</td><td className="p-2">${o.amount.toFixed(2)}</td><td className="p-2">{o.date}</td></tr>
                        ))}</tbody>
                    </table>
                )}

                {/* Payouts Tab */}
                {activeTab === 'payouts' && (
                     <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-2">Payout ID</th><th className="p-2">Date</th><th className="p-2">Amount</th><th className="p-2">Method</th><th className="p-2">Status</th>
                        </tr></thead>
                        <tbody>{MOCK_PAYOUTS.map(p => (
                            <tr key={p.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent">
                                <td className="p-2 font-mono">{p.id}</td>
                                <td className="p-2">{p.date}</td>
                                <td className="p-2 font-semibold">${p.amount.toFixed(2)}</td>
                                <td className="p-2">{p.method}</td>
                                <td className="p-2"><span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPayoutStatusClass(p.status)}`}>{p.status}</span></td>
                            </tr>
                        ))}</tbody>
                    </table>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-4">
                        <h3 className="text-xl text-gray-800 dark:text-platinum">Manage Vendor</h3>
                        <div className="bg-gray-100 dark:bg-deep-black/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Suspend Vendor</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">This will temporarily disable the vendor and their products.</p>
                            </div>
                            <button onClick={() => handleStatusUpdate(VendorStatus.Suspended)} className="px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500">
                                Suspend
                            </button>
                        </div>
                        <div className="bg-gray-100 dark:bg-deep-black/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Activate Vendor</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Allow this vendor to sell products on the platform.</p>
                            </div>
                             <button onClick={() => handleStatusUpdate(VendorStatus.Active)} className="px-4 py-2 rounded-lg bg-emerald/80 text-white hover:bg-emerald">
                                Activate
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorProfilePage;
