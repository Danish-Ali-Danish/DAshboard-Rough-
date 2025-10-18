
import React from 'react';
// Fix: Correctly import types from the newly populated types.ts file.
import { Product, ProductStatus, Order, OrderStatus, Vendor, VendorStatus, User, UserStatus, Role, PermissionSet, InventoryItem, Coupon, CouponStatus, Review, ReviewStatus, Settings, Payout, Transaction, TransactionType, TransactionStatus, Expense, ExpenseCategory } from './types';

// Fix: Define PERMISSIONS_CONFIG here instead of importing from a non-existent file.
export const PERMISSIONS_CONFIG: { [key in keyof PermissionSet]: { label: string; description: string } } = {
    dashboard: { label: 'Dashboard', description: 'Can view the main dashboard.' },
    products: { label: 'Products', description: 'Manage products, categories, and brands.' },
    orders: { label: 'Orders', description: 'Manage orders and customer information.' },
    vendors: { label: 'Vendors', description: 'Manage vendor accounts and profiles.' },
    users: { label: 'Users', description: 'Manage admin users (excluding Super Admins).' },
    financials: { label: 'Financials', description: 'View financial reports and analytics.' },
    inventory: { label: 'Inventory', description: 'Manage stock levels and inventory.' },
    offers: { label: 'Offers & Coupons', description: 'Create and manage promotional offers.' },
    reviews: { label: 'Reviews', description: 'Moderate and manage product reviews.' },
    settings: { label: 'Settings', description: 'Configure general store settings.' },
    roles: { label: 'Roles & Permissions', description: 'Manage user roles and their permissions.' },
};

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export const StyleStashLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h2.28c.35.6.98 1 1.72 1s1.37-.4 1.72-1H17c1.1 0 2 .9 2 2v3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12v9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 2.5c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const ViewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
  </svg>
);

export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28L19.5 21M12 21V3" />
    </svg>
);
  
export const TrendingDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0L21 18M12 3v18" />
    </svg>
);


// Sidebar Icons
export const DashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);
export const ProductsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);
export const OrdersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 6.5 4.5h.008c.338 0 .65.06.932.175a2.25 2.25 0 0 1-.586 1.702m-.352 8.442a2.25 2.25 0 0 1-1.173.935c-.334.124-.689.19-1.065.19H4.5a2.25 2.25 0 0 1-2.25-2.25V6.935c0-.663.284-1.268.746-1.684l3.754-3.754a2.246 2.246 0 0 1 1.682-.746H13.5a2.25 2.25 0 0 1 2.25 2.25v5.019m-4.5-3.045h4.5" />
  </svg>
);
export const VendorsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0 1 15.75 11.25h.54l-1.622-1.622a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06l1.622-1.622h-.54A2.25 2.25 0 0 0 13.5 13.5V21Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-1.882 0-3.672.766-4.95 2.05A7.5 7.5 0 0 0 12 21a7.5 7.5 0 0 0 4.95-16.7A7.525 7.525 0 0 0 12 2.25Z" />
  </svg>
);
export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.53-2.473M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663v.003zM11.25 11.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0z" />
  </svg>
);
export const FinancialsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V6.75c0-.621.504-1.125 1.125-1.125h.375M3 15h18M12 6v9" />
  </svg>
);
export const InventoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
);
export const OffersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
  </svg>
);
export const ReviewsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-3.355a.562.562 0 0 0-.652 0l-4.725 3.355a.562.562 0 0 1-.84-.61l1.285-5.385a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);
export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg>
);

// MOCK DATA

export const MOCK_METRICS = [
    { title: 'Total Revenue', value: 489345, progress: 75, format: 'currency' as const },
    { title: 'Total Orders', value: 2450, progress: 60, format: 'number' as const },
    { title: 'Active Products', value: 89, progress: 90, format: 'number' as const },
    { title: 'Registered Vendors', value: 12, progress: 100, format: 'number' as const },
];

export const MOCK_SALES_DATA = [
    { name: 'Jan', sales: 40000, expenses: 24000 }, { name: 'Feb', sales: 30000, expenses: 19000 }, { name: 'Mar', sales: 50000, expenses: 28000 },
    { name: 'Apr', sales: 45000, expenses: 25000 }, { name: 'May', sales: 60000, expenses: 32000 }, { name: 'Jun', sales: 55000, expenses: 30000 },
];

export const MOCK_CATEGORY_DATA = [
    { name: 'T-Shirts', value: 450 },
    { name: 'Hoodies', value: 250 },
    { name: 'Jeans', value: 200 },
];

export const MOCK_TOP_PRODUCTS_DATA = [
    { name: 'Classic Cotton Tee', sales: 500 },
    { name: 'Vintage Denim Jacket', sales: 450 },
    { name: 'Cozy Knit Hoodie', sales: 380 },
    { name: 'Slim-Fit Chinos', sales: 320 },
    { name: 'Graphic Print Tee', sales: 280 },
];

export const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Classic Cotton Tee', sku: 'SS-001', category: 'T-Shirts', price: 25, stock: 150, status: ProductStatus.Active, imageUrl: 'https://picsum.photos/seed/shirt1/100', vendorId: '1' },
    { id: '2', name: 'Vintage Denim Jacket', sku: 'SS-002', category: 'Jackets', price: 85, stock: 40, status: ProductStatus.Active, imageUrl: 'https://picsum.photos/seed/jacket1/100', vendorId: '2' },
    { id: '3', name: 'Cozy Knit Hoodie', sku: 'SS-003', category: 'Hoodies', price: 60, stock: 0, status: ProductStatus.OutOfStock, imageUrl: 'https://picsum.photos/seed/hoodie1/100', vendorId: '3' },
    { id: '4', name: 'Slim-Fit Chinos', sku: 'SS-004', category: 'Pants', price: 55, stock: 75, status: ProductStatus.Active, imageUrl: 'https://picsum.photos/seed/pants1/100', vendorId: '1' },
    { id: '5', name: 'Graphic Print Tee', sku: 'SS-005', category: 'T-Shirts', price: 30, stock: 25, status: ProductStatus.Draft, imageUrl: 'https://picsum.photos/seed/shirt2/100', vendorId: '2' },
];

export const MOCK_ORDERS: Order[] = [
    { id: '#SS2024-001', customer: { name: 'John Doe', email: 'john@example.com', address: '123 Main St, Anytown, USA' }, amount: 55, date: '2024-07-15', status: OrderStatus.Delivered, paymentMethod: 'Stripe', items: [ {id: '1', name: 'Classic Cotton Tee', quantity: 1, price: 25, imageUrl: 'https://picsum.photos/seed/shirt1/100'}, {id: '5', name: 'Graphic Print Tee', quantity: 1, price: 30, imageUrl: 'https://picsum.photos/seed/shirt2/100'} ]},
    { id: '#SS2024-002', customer: { name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak Ave, Anytown, USA' }, amount: 85, date: '2024-07-14', status: OrderStatus.Shipped, paymentMethod: 'PayPal', items: [ {id: '2', name: 'Vintage Denim Jacket', quantity: 1, price: 85, imageUrl: 'https://picsum.photos/seed/jacket1/100'} ]},
    { id: '#SS2024-003', customer: { name: 'Peter Jones', email: 'peter@example.com', address: '789 Pine Ln, Anytown, USA' }, amount: 60, date: '2024-07-13', status: OrderStatus.Pending, paymentMethod: 'Stripe', items: [ {id: '3', name: 'Cozy Knit Hoodie', quantity: 1, price: 60, imageUrl: 'https://picsum.photos/seed/hoodie1/100'} ]},
    { id: '#SS2024-004', customer: { name: 'Mary Johnson', email: 'mary@example.com', address: '101 Maple Rd, Anytown, USA' }, amount: 55, date: '2024-07-12', status: OrderStatus.Cancelled, paymentMethod: 'Bank Transfer', items: [ {id: '4', name: 'Slim-Fit Chinos', quantity: 1, price: 55, imageUrl: 'https://picsum.photos/seed/pants1/100'} ]},
];

export const MOCK_VENDORS: Vendor[] = [
    { id: '1', brandName: 'Urban Threads', contactPerson: 'Alex Chen', email: 'contact@urbanthreads.com', status: VendorStatus.Active, joinedDate: '2022-01-15', logoUrl: 'https://picsum.photos/seed/urban/100', commission: 15 },
    { id: '2', brandName: 'Denim Co.', contactPerson: 'Maria Garcia', email: 'info@denimco.com', status: VendorStatus.Active, joinedDate: '2022-03-20', logoUrl: 'https://picsum.photos/seed/denim/100', commission: 12 },
    { id: '3', brandName: 'Cozy Knits', contactPerson: 'Brian O\'Neil', email: 'support@cozyknits.com', status: VendorStatus.Inactive, joinedDate: '2023-05-10', logoUrl: 'https://picsum.photos/seed/knits/100', commission: 10 },
    { id: '4', brandName: 'Formal Attire Inc.', contactPerson: 'Victoria Beckham', email: 'info@formalattire.com', status: VendorStatus.Suspended, joinedDate: '2021-11-30', logoUrl: 'https://picsum.photos/seed/formal/100', commission: 20 },
];


export const MOCK_ROLES: Role[] = [
  { 
    id: '1', 
    name: 'Super Admin', 
    description: 'Has all permissions.', 
    permissions: Object.keys(PERMISSIONS_CONFIG).reduce((acc, module) => {
      acc[module as keyof PermissionSet] = { view: true, create: true, edit: true, delete: true };
      return acc;
    }, {} as PermissionSet)
  },
  { 
    id: '2', 
    name: 'Store Manager', 
    description: 'Manages products, orders, and vendors.',
    permissions: {
      dashboard: { view: true },
      products: { view: true, create: true, edit: true, delete: false },
      orders: { view: true, create: false, edit: true, delete: false },
      vendors: { view: true, create: false, edit: true, delete: false },
      users: { view: true, create: false, edit: false, delete: false },
      financials: { view: true },
      inventory: { view: true, edit: true },
      offers: { view: true, create: true, edit: true, delete: true },
      reviews: { view: true, edit: true },
      settings: { view: false },
      roles: { view: false, create: false, edit: false, delete: false },
    }
  },
  { 
    id: '3', 
    name: 'Content Editor', 
    description: 'Manages product descriptions and reviews.',
    permissions: {
      dashboard: { view: true },
      products: { view: true, create: false, edit: true, delete: false },
      orders: { view: false },
      vendors: { view: false },
      users: { view: false },
      financials: { view: false },
      inventory: { view: false },
      offers: { view: false },
      reviews: { view: true, edit: true },
      settings: { view: false },
      roles: { view: false, create: false, edit: false, delete: false },
    }
  },
];


export const MOCK_USERS: User[] = [
    { id: '1', name: 'Alice Admin', email: 'alice@stylestash.com', roleId: '1', status: UserStatus.Active, joined: '2022-01-01', avatarUrl: 'https://picsum.photos/seed/user1/100' },
    { id: '2', name: 'Bob Manager', email: 'bob@stylestash.com', roleId: '2', status: UserStatus.Active, joined: '2022-02-15', avatarUrl: 'https://picsum.photos/seed/user2/100' },
    { id: '3', name: 'Charlie Editor', email: 'charlie@stylestash.com', roleId: '3', status: UserStatus.Inactive, joined: '2023-03-20', avatarUrl: 'https://picsum.photos/seed/user3/100' },
    { id: '4', name: 'David Customer', email: 'david@customer.com', roleId: '3', status: UserStatus.Blocked, joined: '2023-08-10', avatarUrl: 'https://picsum.photos/seed/user4/100' },
];

export const MOCK_INVENTORY: InventoryItem[] = MOCK_PRODUCTS.map(p => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    stock: p.stock,
    reorderThreshold: 10,
    vendor: MOCK_VENDORS.find(v => v.id === p.vendorId)?.brandName || 'N/A',
    imageUrl: p.imageUrl,
}));

export const MOCK_COUPONS: Coupon[] = [
    { id: '1', code: 'SUMMER20', discount: 20, type: 'Percent', startDate: '2024-06-01', endDate: '2024-08-31', usageLimit: 100, usageCount: 45, status: CouponStatus.Active },
    { id: '2', code: 'NEW50', discount: 50, type: 'Flat', startDate: '2024-07-01', endDate: '2024-07-31', usageLimit: 200, usageCount: 150, status: CouponStatus.Active },
    { id: '3', code: 'WINTER15', discount: 15, type: 'Percent', startDate: '2023-12-01', endDate: '2024-02-29', usageLimit: 50, usageCount: 50, status: CouponStatus.Expired },
    { id: '4', code: 'FLASH25', discount: 25, type: 'Percent', startDate: '2024-09-01', endDate: '2024-09-05', usageLimit: 100, usageCount: 0, status: CouponStatus.Scheduled },
];

export const MOCK_REVIEWS: Review[] = [
    { id: '1', product: { id: '1', name: 'Classic Cotton Tee', imageUrl: 'https://picsum.photos/seed/shirt1/100' }, customer: { id: '1', name: 'John Doe' }, rating: 5, text: 'Amazing quality and perfect fit. Will buy again!', date: '2024-07-10', status: ReviewStatus.Approved },
    { id: '2', product: { id: '2', name: 'Vintage Denim Jacket', imageUrl: 'https://picsum.photos/seed/jacket1/100' }, customer: { id: '2', name: 'Jane Smith' }, rating: 4, text: 'Great jacket, very stylish. A bit on the heavy side, but I love it.', date: '2024-07-08', status: ReviewStatus.Approved },
    { id: '3', product: { id: '4', name: 'Slim-Fit Chinos', imageUrl: 'https://picsum.photos/seed/pants1/100' }, customer: { id: '3', name: 'Peter Jones' }, rating: 3, text: 'Color is a bit different than the picture. Fit is okay.', date: '2024-07-05', status: ReviewStatus.Pending },
    { id: '4', product: { id: '1', name: 'Classic Cotton Tee', imageUrl: 'https://picsum.photos/seed/shirt1/100' }, customer: { id: '4', name: 'Mary Johnson' }, rating: 1, text: 'Shrank after one wash. Very disappointed.', date: '2024-07-02', status: ReviewStatus.Rejected },
];

export const MOCK_SETTINGS: Settings = {
    general: {
        brandName: 'StyleStash',
        currency: 'USD',
        language: 'en',
        timezone: 'UTC-5',
    },
    payment: {
        stripe: true,
        paypal: true,
        bankTransfer: false,
    },
    notifications: {
        email: true,
        sms: false,
        push: true,
    }
};

export const MOCK_PAYOUTS: Payout[] = [
    { id: 'PAY-001', date: '2024-07-01', amount: 15200.50, method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-002', date: '2024-06-01', amount: 12800.00, method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-003', date: '2024-05-01', amount: 14100.75, method: 'PayPal', status: 'Completed' },
    { id: 'PAY-004', date: '2024-08-01', amount: 16500.00, method: 'Bank Transfer', status: 'Pending' },
];

export const MOCK_EXPENSES: Expense[] = [
    { id: 'EXP-1', date: '2024-07-20', category: ExpenseCategory.Marketing, description: 'Q3 Social Media Campaign', amount: 2500 },
    { id: 'EXP-2', date: '2024-07-18', category: ExpenseCategory.Software, description: 'Figma Subscription - Yearly', amount: 864 },
    { id: 'EXP-3', date: '2024-07-15', category: ExpenseCategory.Utilities, description: 'Office Electricity Bill', amount: 350.75 },
    { id: 'EXP-4', date: '2024-07-05', category: ExpenseCategory.Rent, description: 'Office Space Rent - July', amount: 4500 },
    { id: 'EXP-5', date: '2024-07-01', category: ExpenseCategory.Salaries, description: 'Employee Salaries - June', amount: 15000 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    // From Orders
    ...MOCK_ORDERS.map(order => ({
        id: `TRN-${order.id}`,
        date: order.date,
        type: order.status === OrderStatus.Cancelled ? TransactionType.Refund : TransactionType.Sale,
        description: `Order ${order.id} - ${order.customer.name}`,
        amount: order.status === OrderStatus.Cancelled ? -order.amount : order.amount,
        status: TransactionStatus.Completed,
    })),
    // From Payouts
    ...MOCK_PAYOUTS.map(payout => ({
        id: `TRN-${payout.id}`,
        date: payout.date,
        type: TransactionType.Payout,
        description: `Payout ${payout.id}`,
        amount: -payout.amount,
        status: payout.status as TransactionStatus,
    })),
    // From Expenses
    ...MOCK_EXPENSES.map(expense => ({
        id: `TRN-${expense.id}`,
        date: expense.date,
        type: TransactionType.Expense,
        description: `Expense: ${expense.description}`,
        amount: -expense.amount,
        status: TransactionStatus.Completed,
    })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
