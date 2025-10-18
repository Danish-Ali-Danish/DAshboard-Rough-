
import React, { useState } from 'react';
import { Settings } from '../types';
import { MOCK_SETTINGS } from '../constants';

const Toggle: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button 
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-gold' : 'bg-gray-200 dark:bg-deep-black border border-gray-300 dark:border-platinum/50'}`}
    >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
    </button>
);

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState<Settings>(MOCK_SETTINGS);
    const [showToast, setShowToast] = useState(false);

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, general: { ...prev.general, [name]: value } }));
    };

    const handlePaymentChange = (name: keyof Settings['payment'], value: boolean) => {
        setSettings(prev => ({ ...prev, payment: { ...prev.payment, [name]: value } }));
    };

    const handleNotificationChange = (name: keyof Settings['notifications'], value: boolean) => {
        setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, [name]: value } }));
    };

    const handleSave = () => {
        console.log('Settings saved:', settings);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div>
            <h1 className="text-3xl font-display text-gold mb-6">Settings</h1>
            <div className="bg-white dark:bg-graphite p-6 rounded-xl shadow-neumorphic-light dark:shadow-neumorphic-dark flex flex-col md:flex-row gap-8">
                {/* Tabs */}
                <div className="w-full md:w-1/4">
                    <nav className="flex flex-col gap-2">
                        <button onClick={() => setActiveTab('general')} className={`text-left p-3 rounded-lg transition ${activeTab === 'general' ? 'bg-gray-100 dark:bg-deep-black text-gold' : 'text-gray-600 dark:text-platinum hover:bg-gray-200/50 dark:hover:bg-deep-black/50'}`}>General Settings</button>
                        <button onClick={() => setActiveTab('payment')} className={`text-left p-3 rounded-lg transition ${activeTab === 'payment' ? 'bg-gray-100 dark:bg-deep-black text-gold' : 'text-gray-600 dark:text-platinum hover:bg-gray-200/50 dark:hover:bg-deep-black/50'}`}>Payment Settings</button>
                        <button onClick={() => setActiveTab('notifications')} className={`text-left p-3 rounded-lg transition ${activeTab === 'notifications' ? 'bg-gray-100 dark:bg-deep-black text-gold' : 'text-gray-600 dark:text-platinum hover:bg-gray-200/50 dark:hover:bg-deep-black/50'}`}>Notification Settings</button>
                    </nav>
                </div>

                {/* Content */}
                <div className="w-full md:w-3/4 bg-gray-50/50 dark:bg-deep-black/30 p-8 rounded-lg">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-platinum">General Information</h2>
                            <div>
                                <label className="text-sm text-gray-500 dark:text-gray-400">Brand Name</label>
                                <input name="brandName" value={settings.general.brandName} onChange={handleGeneralChange} className="w-full bg-white dark:bg-graphite mt-1 p-2 rounded border border-gray-300 dark:border-graphite/50 focus:outline-none focus:ring-1 focus:ring-gold" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Currency</label>
                                    <select name="currency" value={settings.general.currency} onChange={handleGeneralChange} className="w-full bg-white dark:bg-graphite mt-1 p-2 rounded border border-gray-300 dark:border-graphite/50">
                                        <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option>
                                    </select>
                                </div>
                                 <div>
                                    <label className="text-sm text-gray-500 dark:text-gray-400">Language</label>
                                    <select name="language" value={settings.general.language} onChange={handleGeneralChange} className="w-full bg-white dark:bg-graphite mt-1 p-2 rounded border border-gray-300 dark:border-graphite/50">
                                        <option value="en">English</option><option value="fr">French</option><option value="de">German</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payment' && (
                        <div className="space-y-6">
                             <h2 className="text-xl font-semibold text-gray-800 dark:text-platinum">Payment Gateways</h2>
                             <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white dark:bg-graphite p-4 rounded-lg">
                                    <p>Stripe</p>
                                    <Toggle enabled={settings.payment.stripe} onChange={(val) => handlePaymentChange('stripe', val)} />
                                </div>
                                 <div className="flex justify-between items-center bg-white dark:bg-graphite p-4 rounded-lg">
                                    <p>PayPal</p>
                                    <Toggle enabled={settings.payment.paypal} onChange={(val) => handlePaymentChange('paypal', val)} />
                                </div>
                                <div className="flex justify-between items-center bg-white dark:bg-graphite p-4 rounded-lg">
                                    <p>Bank Transfer</p>
                                    <Toggle enabled={settings.payment.bankTransfer} onChange={(val) => handlePaymentChange('bankTransfer', val)} />
                                </div>
                             </div>
                        </div>
                    )}
                    
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                             <h2 className="text-xl font-semibold text-gray-800 dark:text-platinum">Notification Channels</h2>
                             <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white dark:bg-graphite p-4 rounded-lg">
                                    <p>Email Notifications</p>
                                    <Toggle enabled={settings.notifications.email} onChange={(val) => handleNotificationChange('email', val)} />
                                </div>
                                 <div className="flex justify-between items-center bg-white dark:bg-graphite p-4 rounded-lg">
                                    <p>SMS Notifications</p>
                                    <Toggle enabled={settings.notifications.sms} onChange={(val) => handleNotificationChange('sms', val)} />
                                </div>
                                <div className="flex justify-between items-center bg-white dark:bg-graphite p-4 rounded-lg">
                                    <p>Push Notifications</p>
                                    <Toggle enabled={settings.notifications.push} onChange={(val) => handleNotificationChange('push', val)} />
                                </div>
                             </div>
                        </div>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-graphite/50 flex justify-end">
                        <button onClick={handleSave} className="px-8 py-2 rounded-lg text-deep-black bg-gold-gradient font-semibold hover:brightness-125 transition-all duration-300 transform hover:scale-105 shadow-gold-glow">Save Changes</button>
                    </div>
                </div>
            </div>

             {showToast && (
                <div className="fixed bottom-8 right-8 bg-emerald text-deep-black px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
                    ✅ Settings updated successfully!
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
