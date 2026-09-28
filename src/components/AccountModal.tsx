import React, { useState } from 'react';
import { X, CheckCircle, Mail } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  darkMode
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className={`relative w-full max-w-sm rounded-2xl p-6 shadow-2xl z-50 border transition-all text-center ${
        darkMode ? 'bg-[#1E222D] text-white border-[#2A2E39]' : 'bg-white text-[#131722] border-[#E0E3EB]'
      }`}>
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full ${
            darkMode ? 'hover:bg-[#2A2E39] text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="flex justify-center mb-3">
          <svg className={`w-12 h-9 ${darkMode ? 'text-white' : 'text-[#131722]'}`} fill="currentColor" viewBox="0 0 36 28">
            <rect height="5.2" rx="1" width="9.6" x="0" y="2" />
            <rect height="23" rx="1" width="4" x="2.8" y="2" />
            <path d="M11.5 2h9.6l-5.8 23h-4.2z" />
            <path d="M21.5 2h9.8l4.7 18.2h-4.3L29 9.5l-2.7 10.7h-4.8z" />
          </svg>
        </div>

        <h2 className="text-xl font-black tracking-tight mb-1">
          {submitted ? 'Welcome aboard!' : 'Get started with TradingView'}
        </h2>
        <p className="text-xs text-gray-400 mb-5">
          {submitted 
            ? 'Account verified. Loading your custom watchlists...' 
            : 'Track markets, create custom screeners, and share trading setups.'}
        </p>

        {submitted ? (
          <div className="py-6 flex flex-col items-center justify-center text-[#089981]">
            <CheckCircle className="w-12 h-12 mb-2 animate-bounce" />
            <span className="font-bold text-sm">Successfully connected!</span>
          </div>
        ) : (
          <div className="space-y-3">
            <button 
              onClick={() => {
                setSubmitted(true);
                setTimeout(() => {
                  setSubmitted(false);
                  onClose();
                }, 1500);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 font-bold text-xs flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-[#252A37] transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button 
              onClick={() => {
                setSubmitted(true);
                setTimeout(() => {
                  setSubmitted(false);
                  onClose();
                }, 1500);
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 font-bold text-xs flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-[#252A37] transition cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.79-11.72-14.24-6.3-9.97-11.16-20.9-14.58-32.8C7.62 99.4 5.9 87.72 5.9 77.83c0-14.2 3.65-26.06 10.96-35.58 7.3-9.53 16.3-14.38 27-14.56 5.48 0 11.16 1.48 17.06 4.45 5.9 2.97 9.87 4.51 11.91 4.62 1.54-.11 5.76-1.74 12.67-4.9 6.9-3.15 12.98-4.58 18.23-4.28 14.07.65 25.1 5.94 33.1 15.86-12.44 7.55-18.52 17.84-18.24 30.87.27 10.22 4.17 18.72 11.7 25.49 3.51 3.2 7.5 5.65 11.96 7.36-2.58 7.58-5.87 15.28-9.88 23.09z" />
              </svg>
              <span>Continue with Apple</span>
            </button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                <span className="bg-white dark:bg-[#1E222D] px-2">or email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-[#131722] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <button
                type="submit"
                className="w-full tv-btn-gradient text-white font-bold text-xs py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Sign In / Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
