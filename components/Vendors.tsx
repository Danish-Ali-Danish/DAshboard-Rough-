
import React, { useState, useMemo } from 'react';
import { Vendor, VendorStatus } from '../types';
import { EditIcon, DeleteIcon, ViewIcon } from '../constants';

const getStatusClass = (status: VendorStatus) => {
    switch (status) {
        case VendorStatus.Active: return 'bg-emerald/20 text-emerald border-emerald/30';
        case VendorStatus.Inactive: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case VendorStatus.Suspended: return 'bg-red-500/20 text-red-400 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

interface VendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: Vendor | null;
    onSave: (vendor: Vendor) => void;
}

const VendorModal: React.FC<VendorModalProps> = ({ isOpen, onClose, vendor, onSave }) => {
    const [formData, setFormData] = useState<Partial<Vendor>>(vendor || {});

    React.useEffect(() => {
        setFormData(vendor || {
            brandName: '',
            contactPerson: '',
            email: '',
            commission: 0,
            status: VendorStatus.Active,
        });
    }, [vendor]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'commission' ? (parseFloat(value) || 0) : value }));
    };
    
    const handleSave = () => {
        if (formData.brandName && formData.email) {
            onSave(formData as Vendor);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-graphite w-full max-w-xl rounded-xl shadow-gold-glow-strong p-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-display text-gold mb-6">{vendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Brand Name</label>
                        <input name="brandName" value={formData.brandName || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Contact Person</label>
                        <input name="contactPerson" value={formData.contactPerson || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                     <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Email</label>
                        <input name="email" type="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Commission (%)</label>
                        <input name="commission" type="number" value={formData.commission || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-600 dark:text-platinum">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold">
                            {Object.values(VendorStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-graphite border border-gray-300 dark:border-platinum/50 hover:border-gray-400 dark:hover:border-white transition">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold hover:brightness-125 transition shadow-gold-glow">Save Vendor</button>
                </div>
            </div>
        </div>
    );
};

interface VendorsPageProps {
    searchTerm: string;
    vendors: Vendor[];
    setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
    onViewVendor: (vendorId: string) => void;
}

const VendorsPage: React.FC<VendorsPageProps> = ({ searchTerm, vendors, setVendors, onViewVendor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

    const filteredVendors = useMemo(() => {
        if (!searchTerm) return vendors;
        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k);
        return vendors.filter(vendor => {
            const searchableString = `${vendor.brandName} ${vendor.contactPerson} ${vendor.email}`.toLowerCase();
            return searchKeywords.every(keyword => searchableString.includes(keyword));
        });
    }, [vendors, searchTerm]);

    const handleOpenModal = (vendor: Vendor | null = null) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVendor(null);
    };
    
    const handleSaveVendor = (vendorData: Vendor) => {
        if (selectedVendor) {
            setVendors(vendors.map(v => v.id === selectedVendor.id ? {...v, ...vendorData} : v));
        } else {
            const newVendor = { 
                ...vendorData, 
                id: (Math.max(...vendors.map(v => parseInt(v.id))) + 1).toString(),
                logoUrl: 'https://picsum.photos/seed/newvendor/100',
                joinedDate: new Date().toISOString().split('T')[0],
            };
            setVendors([newVendor, ...vendors]);
        }
        handleCloseModal();
    };

    const handleDeleteVendor = (id: string) => {
      setVendors(vendors.filter(v => v.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Vendor Management</h1>
                <button onClick={() => handleOpenModal()} className="px-5 py-2 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 transition-all shadow-gold-glow transform hover:scale-105 duration-300">
                    Add New Vendor
                </button>
            </div>
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-4">Logo</th>
                            <th className="p-4">Brand Name</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Joined Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVendors.map((vendor) => (
                            <tr key={vendor.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent transition-colors">
                                <td className="p-4"><img src={vendor.logoUrl} alt={vendor.brandName} className="h-12 w-12 rounded-full object-cover" /></td>
                                <td className="p-4 font-semibold">{vendor.brandName}</td>
                                <td className="p-4">{vendor.contactPerson}</td>
                                <td className="p-4 text-gray-600 dark:text-platinum">{vendor.email}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(vendor.status)}`}>
                                        {vendor.status}
                                    </span>
                                </td>
                                <td className="p-4">{vendor.joinedDate}</td>
                                <td className="p-4 space-x-4 flex items-center">
                                    <button onClick={() => onViewVendor(vendor.id)} className="text-gray-500 dark:text-platinum hover:text-gold transition" title="View Profile"><ViewIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleOpenModal(vendor)} className="text-gray-500 dark:text-platinum hover:text-gold transition" title="Edit Vendor"><EditIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDeleteVendor(vendor.id)} className="text-gray-500 dark:text-platinum hover:text-red-500 transition" title="Delete Vendor"><DeleteIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <VendorModal isOpen={isModalOpen} onClose={handleCloseModal} vendor={selectedVendor} onSave={handleSaveVendor} />
        </div>
    );
};

export default VendorsPage;
