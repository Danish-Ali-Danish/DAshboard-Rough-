
import React, { useState } from 'react';
import { StyleStashLogo, LockIcon } from '../constants';

interface LoginPageProps {
    onLogin: (email: string, pass: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('admin@stylestash.com');
    const [password, setPassword] = useState('password');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen w-full bg-deep-black text-silver flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-gold/50 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 border border-gold/40 rounded-full animate-spin-slower"></div>
                <style>{`
                    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                    @keyframes spin-slower { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                    .animate-spin-slower { animation: spin-slower 30s linear infinite; }
                `}</style>
            </div>

            <div className="w-full max-w-md bg-graphite/80 backdrop-blur-lg rounded-2xl border border-gold/20 shadow-gold-glow p-8 z-10">
                <div className="text-center mb-8">
                    <StyleStashLogo className="w-20 h-20 text-gold mx-auto" />
                    <h1 className="text-4xl font-display text-white mt-4">Welcome to StyleStash</h1>
                    <p className="text-platinum mt-2">Admin Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-platinum">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-2 p-3 bg-deep-black rounded-lg border border-graphite focus:outline-none focus:ring-2 focus:ring-gold/80 transition-shadow shadow-inner"
                            placeholder="admin@stylestash.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-platinum">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-2 p-3 bg-deep-black rounded-lg border border-graphite focus:outline-none focus:ring-2 focus:ring-gold/80 transition-shadow shadow-inner"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-platinum">
                            <input type="checkbox" className="h-4 w-4 rounded bg-deep-black border-graphite text-gold focus:ring-gold" />
                            Remember Me
                        </label>
                        <a href="#" className="font-medium text-gold hover:underline">Forgot Password?</a>
                    </div>
                    <div>
                        <button 
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg text-deep-black font-semibold bg-gold-gradient hover:brightness-110 transition-all shadow-gold-glow transform hover:scale-105 duration-300"
                        >
                            <LockIcon className="w-5 h-5" />
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
