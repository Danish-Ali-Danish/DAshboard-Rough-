
import React, { useState, useMemo } from 'react';
import { Coupon, CouponStatus } from '../types';
import { MOCK_COUPONS, EditIcon, DeleteIcon } from '../constants';

const getStatusClass = (status: CouponStatus) => {
    switch (status) {
        case CouponStatus.Active: return 'bg-emerald/20 text-emerald border-emerald/30';
        case CouponStatus.Expired: return 'bg-red-500/20 text-red-400 border-red-500/30';
        case CouponStatus.Scheduled: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

interface CouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    coupon: Coupon | null;
    onSave: (coupon: Coupon) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ isOpen, onClose, coupon, onSave }) => {
    const [formData, setFormData] = useState<Partial<Coupon>>(coupon || {});

    React.useEffect(() => {
        setFormData(coupon || {
            code: `CHRONO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            discount: 10,
            type: 'Percent',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            usageLimit: 100,
            status: CouponStatus.Active
        });
    }, [coupon]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (formData.code && formData.discount) {
            const savedData = {
                ...formData,
                discount: parseFloat(String(formData.discount)) || 0,
                usageLimit: parseInt(String(formData.usageLimit), 10) || 0,
            };
            onSave(savedData as Coupon);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-graphite w-full max-w-2xl rounded-xl shadow-gold-glow-strong p-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-display text-gold mb-6">{coupon ? 'Edit Coupon' : 'Create New Offer'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Coupon Code</label>
                        <input name="code" value={formData.code || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Discount Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite">
                            <option>Percent</option>
                            <option>Flat</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Discount Value</label>
                        <input name="discount" type="number" value={formData.discount || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Usage Limit</label>
                        <input name="usageLimit" type="number" value={formData.usageLimit || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Start Date</label>
                        <input name="startDate" type="date" value={formData.startDate || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">End Date</label>
                        <input name="endDate" type="date" value={formData.endDate || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-graphite border border-gray-300 dark:border-platinum/50 hover:border-gray-400 dark:hover:border-white transition">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold hover:brightness-125 transition shadow-gold-glow">Save Coupon</button>
                </div>
            </div>
        </div>
    );
};

interface OffersPageProps {
    searchTerm: string;
}

const OffersPage: React.FC<OffersPageProps> = ({ searchTerm }) => {
    const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    const filteredCoupons = useMemo(() => {
        if (!searchTerm) return coupons;
        const lowercasedFilter = searchTerm.toLowerCase();
        return coupons.filter(coupon => coupon.code.toLowerCase().includes(lowercasedFilter));
    }, [coupons, searchTerm]);

    const handleOpenModal = (coupon: Coupon | null = null) => {
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCoupon(null);
    };

    const handleSaveCoupon = (couponData: Coupon) => {
        if (selectedCoupon) {
            setCoupons(coupons.map(c => c.id === selectedCoupon.id ? { ...c, ...couponData } : c));
        } else {
            const newCoupon = { ...couponData, id: (coupons.length + 1).toString(), usageCount: 0 };
            setCoupons([newCoupon, ...coupons]);
        }
        handleCloseModal();
    };
    
    const handleDeleteCoupon = (id: string) => {
        setCoupons(coupons.filter(c => c.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Offers & Coupons</h1>
                <button onClick={() => handleOpenModal()} className="px-5 py-2 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 transition-all shadow-gold-glow transform hover:scale-105 duration-300">
                    Create Offer
                </button>
            </div>
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-4">Coupon Code</th>
                            <th className="p-4">Discount</th>
                            <th className="p-4">Start Date</th>
                            <th className="p-4">End Date</th>
                            <th className="p-4">Usage</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoupons.map((coupon) => (
                            <tr key={coupon.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent transition-colors">
                                <td className="p-4 font-mono text-gold">{coupon.code}</td>
                                <td className="p-4">{coupon.type === 'Percent' ? `${coupon.discount}%` : `$${coupon.discount.toFixed(2)}`}</td>
                                <td className="p-4">{coupon.startDate}</td>
                                <td className="p-4">{coupon.endDate}</td>
                                <td className="p-4">{coupon.usageCount} / {coupon.usageLimit}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(coupon.status)}`}>
                                        {coupon.status}
                                    </span>
                                </td>
                                <td className="p-4 space-x-4 flex items-center">
                                    <button onClick={() => handleOpenModal(coupon)} className="text-gray-500 dark:text-platinum hover:text-gold transition"><EditIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-gray-500 dark:text-platinum hover:text-red-500 transition"><DeleteIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <CouponModal isOpen={isModalOpen} onClose={handleCloseModal} coupon={selectedCoupon} onSave={handleSaveCoupon} />
        </div>
    );
};

export default OffersPage;
