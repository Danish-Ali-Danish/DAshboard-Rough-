
import React, { useState, useMemo } from 'react';
import { Product, ProductStatus } from '../types';

const getStatusClass = (status: ProductStatus) => {
    switch (status) {
        case ProductStatus.Active: return 'bg-emerald/20 text-emerald border-emerald/30';
        case ProductStatus.Draft: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case ProductStatus.OutOfStock: return 'bg-red-500/20 text-red-400 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onSave }) => {
    const [formData, setFormData] = useState<Partial<Product>>(product || {});

    React.useEffect(() => {
        setFormData(product || {
            name: '',
            sku: `SS-NEW-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            category: 'T-Shirts',
            price: 0,
            stock: 0,
            status: ProductStatus.Draft,
            vendorId: '1', // Default vendor
        });
    }, [product]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSave = () => {
        // Basic validation
        if (formData.name && formData.price) {
            const savedData = {
                ...formData,
                price: parseFloat(String(formData.price)) || 0,
                stock: parseInt(String(formData.stock), 10) || 0,
            };
            onSave(savedData as Product);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-graphite w-full max-w-2xl rounded-xl shadow-gold-glow-strong p-8 transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-display text-gold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Product Name</label>
                        <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">SKU</label>
                        <input name="sku" value={formData.sku || ''} onChange={handleChange} disabled className="w-full bg-gray-200/50 dark:bg-deep-black/50 text-gray-400 mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold">
                            <option>T-Shirts</option>
                            <option>Hoodies</option>
                            <option>Jackets</option>
                            <option>Pants</option>
                            <option>Dresses</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Price</label>
                        <input name="price" type="number" value={formData.price || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Stock</label>
                        <input name="stock" type="number" value={formData.stock || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold">
                            <option value={ProductStatus.Active}>Active</option>
                            <option value={ProductStatus.Draft}>Draft</option>
                            <option value={ProductStatus.OutOfStock}>Out of Stock</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-graphite border border-gray-300 dark:border-platinum/50 hover:border-gray-400 dark:hover:border-white transition">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold hover:brightness-125 transition shadow-gold-glow">Save Product</button>
                </div>
            </div>
        </div>
    );
};

interface ProductsPageProps {
    searchTerm: string;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ searchTerm, products, setProducts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k);
        return products.filter(product => {
            const searchableString = `${product.name} ${product.sku} ${product.category}`.toLowerCase();
            return searchKeywords.every(keyword => searchableString.includes(keyword));
        });
    }, [products, searchTerm]);


    const handleOpenModal = (product: Product | null = null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };
    
    const handleSaveProduct = (productData: Product) => {
        if (selectedProduct) {
            setProducts(products.map(p => p.id === selectedProduct.id ? {...p, ...productData} : p));
        } else {
            const newProduct = { ...productData, id: (Math.max(...products.map(p => parseInt(p.id))) + 1).toString(), imageUrl: 'https://picsum.photos/seed/new/100/100' };
            setProducts([newProduct, ...products]);
        }
        handleCloseModal();
    };

    const handleDeleteProduct = (id: string) => {
      setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Product Management</h1>
                <button onClick={() => handleOpenModal()} className="px-5 py-2 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 transition-all shadow-gold-glow transform hover:scale-105 duration-300">
                    Add New Product
                </button>
            </div>
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-graphite/80">
                            <th className="p-4">Image</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">SKU</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent transition-colors">
                                <td className="p-4"><img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-lg object-cover" /></td>
                                <td className="p-4 font-semibold">{product.name}</td>
                                <td className="p-4 font-mono text-gray-500 dark:text-platinum">{product.sku}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(product.status)}`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="p-4 space-x-2">
                                    <button onClick={() => handleOpenModal(product)} className="text-gray-500 dark:text-platinum hover:text-gold transition">Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-500 dark:text-platinum hover:text-red-500 transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} onSave={handleSaveProduct} />
        </div>
    );
};

export default ProductsPage;
