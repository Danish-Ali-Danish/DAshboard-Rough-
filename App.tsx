
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_VENDORS, MOCK_USERS, MOCK_INVENTORY, MOCK_ROLES, StyleStashLogo, SearchIcon, BellIcon, UserIcon, DashboardIcon, ProductsIcon, OrdersIcon, VendorsIcon, UsersIcon, FinancialsIcon, InventoryIcon, OffersIcon, ReviewsIcon, SettingsIcon, LogoutIcon, SunIcon, MoonIcon, ChevronDownIcon } from './constants';
import { Page, Product, Order, Vendor, User, InventoryItem, Role } from './types';
import DashboardPage from './components/Dashboard';
import ProductsPage from './components/Products';
import OrdersPage from './components/Orders';
import VendorsPage from './components/Vendors';
import UsersPage from './components/Users';
import VendorProfilePage from './components/VendorProfile';
import FinancialsPage from './components/Financials';
import InventoryPage from './components/Inventory';
import OffersPage from './components/Offers';
import ReviewsPage from './components/Reviews';
import SettingsPage from './components/Settings';
import LoginPage from './components/LoginPage';

type Theme = 'light' | 'dark';

const Sidebar: React.FC<{ activePage: Page; onNavigate: (page: Page) => void }> = ({ activePage, onNavigate }) => {
    const navItems = [
        { page: Page.Dashboard, icon: DashboardIcon, label: 'Dashboard' },
        { page: Page.Products, icon: ProductsIcon, label: 'Products' },
        { page: Page.Orders, icon: OrdersIcon, label: 'Orders' },
        { page: Page.Vendors, icon: VendorsIcon, label: 'Vendors' },
        { page: Page.Users, icon: UsersIcon, label: 'Users' },
        { page: Page.Financials, icon: FinancialsIcon, label: 'Financials' },
        { page: Page.Inventory, icon: InventoryIcon, label: 'Inventory' },
        { page: Page.Offers, icon: OffersIcon, label: 'Offers & Coupons' },
        { page: Page.Reviews, icon: ReviewsIcon, label: 'Reviews' },
        { page: Page.Settings, icon: SettingsIcon, label: 'Settings' },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-graphite/50 flex flex-col p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-10 px-2">
                <StyleStashLogo className="w-10 h-10 text-gold" />
                <h1 className="text-2xl font-display text-gray-900 dark:text-white">StyleStash</h1>
            </div>
            <nav className="flex-grow">
                <ul>
                    {navItems.map(({ page, icon: Icon, label }) => (
                        <li key={page}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onNavigate(page); }}
                                className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 text-lg relative ${
                                    activePage === page 
                                    ? 'text-gold bg-gray-100 dark:bg-deep-black/50' 
                                    : 'text-gray-600 dark:text-platinum hover:bg-gray-100 dark:hover:bg-deep-black/30'
                                }`}
                            >
                                {activePage === page && <span className="absolute left-0 top-0 h-full w-1 bg-gold rounded-r-full animate-pulse-fast"></span>}
                                <Icon className="w-6 h-6" />
                                <span>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const Header: React.FC<{ onSearch: (term: string) => void; theme: Theme; onThemeToggle: () => void; onLogout: () => void; }> = ({ onSearch, theme, onThemeToggle, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <header className="flex items-center justify-between p-4 bg-white/50 dark:bg-graphite/30 backdrop-blur-sm sticky top-0 z-30 shadow-md dark:shadow-gold/5">
            <div className="relative w-1/3">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search orders, products, etc..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-deep-black rounded-lg border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-6">
                 <button onClick={onThemeToggle} className="p-2 rounded-full text-gray-600 dark:text-platinum hover:bg-gray-100 dark:hover:bg-deep-black transition-colors">
                    {theme === 'dark' ? <SunIcon className="w-6 h-6 text-gold" /> : <MoonIcon className="w-6 h-6" />}
                </button>
                <BellIcon className="w-6 h-6 text-gray-600 dark:text-platinum cursor-pointer" />
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2">
                        <UserIcon className="w-8 h-8 p-1 bg-gold text-deep-black rounded-full" />
                        <span className="font-semibold hidden md:inline text-gray-800 dark:text-white">Admin</span>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-platinum transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-graphite rounded-lg shadow-lg py-1 z-50">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-platinum hover:bg-gray-100 dark:hover:bg-deep-black">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-platinum hover:bg-gray-100 dark:hover:bg-deep-black">Settings</a>
                            <div className="border-t border-gray-200 dark:border-gold/10 my-1"></div>
                            <button onClick={onLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-platinum hover:bg-gray-100 dark:hover:bg-deep-black">
                                <LogoutIcon className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activePage, setActivePage] = useState<Page>(Page.Dashboard);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
    const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
    const [vendorProfileId, setVendorProfileId] = useState<string | null>(null);
    const [theme, setTheme] = useState<Theme>('dark');
    
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };
    
    const handleLogin = (email: string, pass: string) => {
        // Mock authentication
        if (email === 'admin@stylestash.com' && pass === 'password') {
            setIsAuthenticated(true);
            setActivePage(Page.Dashboard); // Reset to dashboard on login
        } else {
            alert('Invalid credentials');
        }
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const handleNavigate = (page: Page) => {
        setActivePage(page);
        setVendorProfileId(null);
    };
    
    const handleViewVendor = (vendorId: string) => {
        setVendorProfileId(vendorId);
        setActivePage(Page.Vendors); // Keep vendor page active in sidebar
    };

    const renderPage = () => {
        if (vendorProfileId) {
            return <VendorProfilePage 
                vendorId={vendorProfileId} 
                onBack={() => setVendorProfileId(null)}
                vendors={vendors}
                setVendors={setVendors}
                allProducts={products}
                allOrders={orders}
            />;
        }

        switch (activePage) {
            case Page.Dashboard: return <DashboardPage orders={orders} theme={theme} />;
            case Page.Products: return <ProductsPage searchTerm={searchTerm} products={products} setProducts={setProducts} />;
            case Page.Orders: return <OrdersPage searchTerm={searchTerm} orders={orders} setOrders={setOrders} />;
            case Page.Vendors: return <VendorsPage searchTerm={searchTerm} vendors={vendors} setVendors={setVendors} onViewVendor={handleViewVendor} />;
            case Page.Users: return <UsersPage searchTerm={searchTerm} users={users} setUsers={setUsers} roles={roles} setRoles={setRoles} />;
            case Page.Financials: return <FinancialsPage theme={theme} />;
            case Page.Inventory: return <InventoryPage searchTerm={searchTerm} inventory={inventory} setInventory={setInventory} />;
            case Page.Offers: return <OffersPage searchTerm={searchTerm} />;
            case Page.Reviews: return <ReviewsPage searchTerm={searchTerm} />;
            case Page.Settings: return <SettingsPage />;
            default: return <DashboardPage orders={orders} theme={theme} />;
        }
    };

    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-deep-black dark:bg-grid-pattern text-gray-800 dark:text-silver">
            <Sidebar activePage={activePage} onNavigate={handleNavigate} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onSearch={setSearchTerm} theme={theme} onThemeToggle={handleThemeToggle} onLogout={handleLogout} />
                <main className="flex-1 overflow-y-auto p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;
