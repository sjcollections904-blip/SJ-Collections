import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          setIsLoading(false);
          return;
        }

        if (data?.session) {
          await login(email, phone);
          closeAuthModal();
          window.location.href = "/";
        } else {
          setError("Check your email and confirm your account before logging in.");
          setIsLoading(false);
        }
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
          setIsLoading(false);
          return;
        }

        if (!data?.session) {
          // If data.session is null, don't redirect.
          // Just show: "Check your email and confirm your account before logging in."
          setMessage("Check your email and confirm your account before logging in.");
          setIsLoading(false);
          return;
        }

        await register(name || email.split('@')[0], email, phone || '03001234567');
        closeAuthModal();
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    await login('hamza.khan@gmail.com', '03001234567');
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAuthModal} />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-[#F9F8F4] w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#E8E5DE] z-10">
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 text-[#8A8882] hover:text-[#1A1A1A]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Logo / Brand Header */}
          <div className="text-center pb-6 border-b border-[#E8E5DE]">
            <img src="/sj-logo.svg" alt="SJ Collections" className="h-10 w-auto mx-auto" />
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mt-3">
              {mode === 'login' ? 'Patron Sign In' : 'Join the SJ Registry'}
            </h3>
            <p className="text-xs text-[#8A8882] mt-1">
              Access your order history, delivery addresses, and curated wishlist.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#EFECE4] my-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                mode === 'login' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#8A8882] hover:text-[#1A1A1A]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                mode === 'register' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#8A8882] hover:text-[#1A1A1A]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A8882] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D4CC] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A8882] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D4CC] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8A8882] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D4CC] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Mobile Number (for COD verification)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8A8882] absolute left-3 top-3" />
                <input
                  type="tel"
                  required={mode === 'register'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567 or +92 333 3368420"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8D4CC] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
              <p className="text-[10px] text-[#8A8882] mt-1">Used by courier for Cash on Delivery arrival notification.</p>
            </div>

            {message && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center leading-relaxed">
                {message}
              </div>
            )}

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors"
            >
              {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In to Account' : 'Create Account'}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-4 border-t border-[#E8E5DE] text-center">
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="text-xs text-[#8A8882] hover:text-[#1A1A1A] underline underline-offset-4"
            >
              Instant Test Access with Patron Demo Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
