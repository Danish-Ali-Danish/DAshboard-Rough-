export enum Page {
    Dashboard = 'Dashboard',
    Products = 'Products',
    Orders = 'Orders',
    Vendors = 'Vendors',
    Users = 'Users',
    Financials = 'Financials',
    Inventory = 'Inventory',
    Offers = 'Offers & Coupons',
    Reviews = 'Reviews',
    Settings = 'Settings',
}

export enum ProductStatus {
    Active = 'Active',
    Draft = 'Draft',
    OutOfStock = 'Out of Stock',
}

export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: ProductStatus;
    imageUrl: string;
    vendorId: string;
}

export enum OrderStatus {
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

export interface Customer {
    name: string;
    email: string;
    address: string;
}

export interface Order {
    id: string;
    customer: Customer;
    amount: number;
    date: string;
    status: OrderStatus;
    paymentMethod: string;
    items: OrderItem[];
}

export enum VendorStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Suspended = 'Suspended',
}

export interface Vendor {
    id: string;
    brandName: string;
    contactPerson: string;
    email: string;
    status: VendorStatus;
    joinedDate: string;
    logoUrl: string;
    commission: number;
}

export enum UserStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Blocked = 'Blocked',
}

export interface User {
    id: string;
    name: string;
    email: string;
    roleId: string;
    status: UserStatus;
    joined: string;
    avatarUrl: string;
}

export interface Permission {
    view?: boolean;
    create?: boolean;
    edit?: boolean;
    delete?: boolean;
}

export interface PermissionSet {
    dashboard: Permission;
    products: Permission;
    orders: Permission;
    vendors: Permission;
    users: Permission;
    financials: Permission;
    inventory: Permission;
    offers: Permission;
    reviews: Permission;
    settings: Permission;
    roles: Permission;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: PermissionSet;
}

export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    stock: number;
    reorderThreshold: number;
    vendor: string;
    imageUrl: string;
}

export enum CouponStatus {
    Active = 'Active',
    Expired = 'Expired',
    Scheduled = 'Scheduled',
}

export interface Coupon {
    id: string;
    code: string;
    discount: number;
    type: 'Percent' | 'Flat';
    startDate: string;
    endDate: string;
    usageLimit: number;
    usageCount: number;
    status: CouponStatus;
}

export enum ReviewStatus {
    Approved = 'Approved',
    Pending = 'Pending',
    Rejected = 'Rejected',
}

export interface Review {
    id: string;
    product: {
        id: string;
        name: string;
        imageUrl: string;
    };
    customer: {
        id: string;
        name: string;
    };
    rating: number;
    text: string;
    date: string;
    status: ReviewStatus;
}

export interface Settings {
    general: {
        brandName: string;
        currency: 'USD' | 'EUR' | 'GBP';
        language: 'en' | 'fr' | 'de';
        timezone: string;
    };
    payment: {
        stripe: boolean;
        paypal: boolean;
        bankTransfer: boolean;
    };
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
}

export interface Payout {
    id: string;
    date: string;
    amount: number;
    method: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

export enum TransactionType {
    Sale = 'Sale',
    Refund = 'Refund',
    Payout = 'Vendor Payout',
    Expense = 'Expense',
}

export enum TransactionStatus {
    Completed = 'Completed',
    Pending = 'Pending',
    Failed = 'Failed',
}

export interface Transaction {
    id: string;
    date: string;
    type: TransactionType;
    description: string;
    amount: number; // positive for income, negative for outcome
    status: TransactionStatus;
}

export enum ExpenseCategory {
    Marketing = 'Marketing',
    Software = 'Software',
    Salaries = 'Salaries',
    Rent = 'Rent',
    Utilities = 'Utilities',
    Other = 'Other',
}

export interface Expense {
    id: string;
    date: string;
    category: ExpenseCategory;
    description: string;
    amount: number;
}
