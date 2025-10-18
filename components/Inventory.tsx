
import React, { useMemo } from 'react';
import { InventoryItem } from '../types';

const getStockLevelClass = (stock: number, threshold: number) => {
    if (stock === 0) return 'text-red-500 font-bold';
    if (stock <= threshold) return 'text-teal-400 font-bold';
    return 'text-emerald';
};

const StockLevelBadge: React.FC<{ stock: number, threshold: number }> = ({ stock, threshold }) => {
    let badgeClass = 'bg-emerald/20 text-emerald border-emerald/30';
    let text = 'In Stock';

    if (stock === 0) {
        badgeClass = 'bg-red-500/20 text-red-500 border-red-500/30';
        text = 'Out of Stock';
    } else if (stock <= threshold) {
        badgeClass = 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        text = 'Low Stock';
    }

    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${badgeClass}`}>
            {text}
        </span>
    );
};

interface InventoryPageProps {
    searchTerm: string;
    inventory: InventoryItem[];
    setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ searchTerm, inventory, setInventory }) => {

    const handleStockChange = (sku: string, newStock: number) => {
        setInventory(inventory.map(item => 
            item.sku === sku ? { ...item, stock: Math.max(0, newStock) } : item
        ));
    };
    
    const filteredInventory = useMemo(() => {
        if (!searchTerm) return inventory;
        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k);
        return inventory.filter(item => {
            const searchableString = `${item.name} ${item.sku} ${item.vendor}`.toLowerCase();
            return searchKeywords.every(keyword => searchableString.includes(keyword));
        });
    }, [inventory, searchTerm]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Inventory Management</h1>
                <button className="px-5 py-2 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 transition-all shadow-gold-glow transform hover:scale-105 duration-300">
                    Download Report
                </button>
            </div>
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-graphite/80">
                                <th className="p-4">Product</th>
                                <th className="p-4">SKU</th>
                                <th className="p-4">Stock Level</th>
                                <th className="p-4">Reorder Threshold</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Vendor</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={item.imageUrl} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                                        <span className="font-semibold">{item.name}</span>
                                    </td>
                                    <td className="p-4 font-mono text-gray-500 dark:text-platinum">{item.sku}</td>
                                    <td className={`p-4 text-lg ${getStockLevelClass(item.stock, item.reorderThreshold)}`}>
                                        {item.stock} units
                                    </td>
                                    <td className="p-4">{item.reorderThreshold} units</td>
                                    <td className="p-4">
                                        <StockLevelBadge stock={item.stock} threshold={item.reorderThreshold} />
                                    </td>
                                    <td className="p-4">{item.vendor}</td>
                                    <td className="p-4 space-x-2 text-center">
                                        <input
                                            type="number"
                                            value={item.stock}
                                            onChange={(e) => handleStockChange(item.sku, parseInt(e.target.value, 10) || 0)}
                                            className="w-20 bg-gray-100 dark:bg-deep-black p-1 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold text-center"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
