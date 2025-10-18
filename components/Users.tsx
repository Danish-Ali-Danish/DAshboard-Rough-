
import React, { useState, useMemo } from 'react';
import { User, UserStatus, Role, PermissionSet, Permission } from '../types';
import { EditIcon, DeleteIcon, ShieldIcon, PERMISSIONS_CONFIG } from '../constants';

const getStatusClass = (status: UserStatus) => {
    switch (status) {
        case UserStatus.Active: return 'bg-emerald/20 text-emerald border-emerald/30';
        case UserStatus.Inactive: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
        case UserStatus.Blocked: return 'bg-red-500/20 text-red-400 border-red-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
};

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSave: (user: User) => void;
    roles: Role[];
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSave, roles }) => {
    const [formData, setFormData] = useState<Partial<User>>(user || {});

    React.useEffect(() => {
        setFormData(user || {
            name: '',
            email: '',
            roleId: roles.length > 0 ? roles[0].id : '',
            status: UserStatus.Active,
        });
    }, [user, roles]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSave = () => {
        if (formData.name && formData.email && formData.roleId) {
            onSave(formData as User);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-graphite w-full max-w-lg rounded-xl shadow-gold-glow-strong p-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-display text-gold mb-6">{user ? 'Edit User' : 'Add New User'}</h2>
                <div className="space-y-4">
                     <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Full Name</label>
                        <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                     <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Email Address</label>
                        <input name="email" type="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold" />
                    </div>
                     <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Role</label>
                        <select name="roleId" value={formData.roleId} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold">
                            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Status</label>
                         <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite focus:outline-none focus:ring-1 focus:ring-gold">
                            {Object.values(UserStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-graphite border border-gray-300 dark:border-platinum/50 hover:border-gray-400 dark:hover:border-white transition">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold hover:brightness-125 transition shadow-gold-glow">Save User</button>
                </div>
            </div>
        </div>
    );
};


interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
    onSave: (role: Role) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, role, onSave }) => {
    const [formData, setFormData] = useState<Partial<Role>>(role || {});

    React.useEffect(() => {
        setFormData(role || {
            name: '',
            description: '',
            permissions: Object.keys(PERMISSIONS_CONFIG).reduce((acc, key) => {
                acc[key as keyof PermissionSet] = {};
                return acc;
            }, {} as PermissionSet)
        });
    }, [role]);

    if (!isOpen) return null;

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handlePermissionChange = (module: keyof PermissionSet, permission: keyof Permission, value: boolean) => {
        setFormData(prev => {
            const newPermissions = {...(prev.permissions || {})};
            const modulePermissions = {...(newPermissions[module] || {})};
            modulePermissions[permission] = value;
            newPermissions[module] = modulePermissions;
            return { ...prev, permissions: newPermissions };
        });
    };

    const handleSave = () => {
        if(formData.name && formData.permissions) {
            onSave(formData as Role);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-graphite w-full max-w-3xl rounded-xl shadow-gold-glow-strong p-8" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-display text-gold mb-6">{role ? 'Edit Role' : 'Create New Role'}</h2>
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Role Name</label>
                        <input name="name" value={formData.name || ''} onChange={handleInfoChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                     <div>
                        <label className="text-sm text-gray-600 dark:text-platinum">Description</label>
                        <input name="description" value={formData.description || ''} onChange={handleInfoChange} className="w-full bg-gray-100 dark:bg-deep-black mt-1 p-2 rounded border border-gray-300 dark:border-graphite" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-platinum mb-4">Permissions</h3>
                <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                    {Object.entries(PERMISSIONS_CONFIG).map(([moduleKey, moduleInfo]) => (
                        <div key={moduleKey} className="bg-gray-100/50 dark:bg-deep-black/50 p-3 rounded-lg">
                            <p className="font-semibold">{moduleInfo.label}</p>
                            <div className="flex gap-6 mt-2">
                                {['view', 'create', 'edit', 'delete'].map(perm => (
                                    <label key={perm} className="flex items-center gap-2 capitalize text-sm">
                                        <input 
                                            type="checkbox" 
                                            className="h-4 w-4 rounded bg-deep-black border-graphite text-gold focus:ring-gold"
                                            checked={formData.permissions?.[moduleKey as keyof PermissionSet]?.[perm as keyof Permission] || false}
                                            onChange={(e) => handlePermissionChange(moduleKey as keyof PermissionSet, perm as keyof Permission, e.target.checked)}
                                        />
                                        {perm}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-8 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-graphite border border-gray-300 dark:border-platinum/50">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold">Save Role</button>
                </div>
            </div>
        </div>
    );
};


interface UsersPageProps {
    searchTerm: string;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    roles: Role[];
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

const UsersPage: React.FC<UsersPageProps> = ({ searchTerm, users, setUsers, roles, setRoles }) => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [activeTab, setActiveTab] = useState('users');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k);
        return users.filter(user => {
            const userRole = roles.find(r => r.id === user.roleId);
            const searchableString = `${user.name} ${user.email} ${userRole?.name || ''}`.toLowerCase();
            return searchKeywords.every(keyword => searchableString.includes(keyword));
        });
    }, [users, roles, searchTerm]);

    const handleOpenUserModal = (user: User | null = null) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const handleCloseUserModal = () => setIsUserModalOpen(false);

    const handleSaveUser = (userData: User) => {
        if (selectedUser) {
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...userData } : u));
        } else {
            setUsers([{ ...userData, id: `${Date.now()}`, avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`, joined: new Date().toISOString().split('T')[0] }, ...users]);
        }
        handleCloseUserModal();
    };

    const handleDeleteUser = (id: string) => setUsers(users.filter(u => u.id !== id));

    const handleOpenRoleModal = (role: Role | null = null) => {
        setSelectedRole(role);
        setIsRoleModalOpen(true);
    };

    const handleCloseRoleModal = () => setIsRoleModalOpen(false);

    const handleSaveRole = (roleData: Role) => {
        if (selectedRole) {
            setRoles(roles.map(r => r.id === selectedRole.id ? { ...r, ...roleData } : r));
        } else {
            setRoles([...roles, { ...roleData, id: `${Date.now()}` }]);
        }
        handleCloseRoleModal();
    };

    const handleDeleteRole = (id: string) => {
        if (users.some(u => u.roleId === id)) {
            alert("Cannot delete a role that is assigned to one or more users.");
            return;
        }
        setRoles(roles.filter(r => r.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display text-gold">Users & Roles</h1>
                <button onClick={activeTab === 'users' ? () => handleOpenUserModal() : () => handleOpenRoleModal()} className="px-5 py-2 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 transition-all shadow-gold-glow transform hover:scale-105 duration-300">
                    {activeTab === 'users' ? 'Add New User' : 'Create New Role'}
                </button>
            </div>

            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <div className="flex border-b border-gray-200 dark:border-graphite/50 mb-6">
                    <button onClick={() => setActiveTab('users')} className={`px-6 py-2 transition ${activeTab === 'users' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Users</button>
                    <button onClick={() => setActiveTab('roles')} className={`px-6 py-2 transition ${activeTab === 'roles' ? 'border-b-2 border-gold text-gold' : 'text-gray-600 dark:text-platinum'}`}>Roles</button>
                </div>
                
                {activeTab === 'users' && (
                    <table className="w-full text-left">
                        <thead><tr className="border-b border-gray-200 dark:border-graphite/80"><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4">Joined</th><th className="p-4">Actions</th></tr></thead>
                        <tbody>{filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 dark:border-graphite/50 hover:bg-gray-50 dark:hover:bg-gradient-to-r from-gold/5 to-transparent">
                                <td className="p-4 flex items-center gap-4"><img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full" /><div><p className="font-semibold">{user.name}</p><p className="text-sm text-gray-500">{user.email}</p></div></td>
                                <td className="p-4">{roles.find(r => r.id === user.roleId)?.name || 'N/A'}</td>
                                <td className="p-4"><span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusClass(user.status)}`}>{user.status}</span></td>
                                <td className="p-4">{user.joined}</td>
                                <td className="p-4 space-x-4"><button onClick={() => handleOpenUserModal(user)} className="text-gray-500 hover:text-gold"><EditIcon className="w-5 h-5"/></button><button onClick={() => handleDeleteUser(user.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button></td>
                            </tr>
                        ))}</tbody>
                    </table>
                )}
                
                {activeTab === 'roles' && (
                    <div className="space-y-4">
                        {roles.map(role => (
                            <div key={role.id} className="bg-gray-50 dark:bg-deep-black/50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><ShieldIcon className="w-5 h-5 text-gold"/>{role.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-platinum">{role.description}</p>
                                </div>
                                <div className="space-x-4">
                                    <button onClick={() => handleOpenRoleModal(role)} className="text-gray-500 hover:text-gold"><EditIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDeleteRole(role.id)} className="text-gray-500 hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} user={selectedUser} onSave={handleSaveUser} roles={roles} />
            <RoleModal isOpen={isRoleModalOpen} onClose={handleCloseRoleModal} role={selectedRole} onSave={handleSaveRole} />
        </div>
    );
};

export default UsersPage;
