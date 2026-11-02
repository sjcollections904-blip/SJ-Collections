import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface SignInProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
  initialEmail?: string;
  registered?: boolean;
}

export const SignIn: React.FC<SignInProps> = ({ onNavigate, initialEmail, registered }) => {
  const [email, setEmail] = useState(() => {
    if (initialEmail) return initialEmail;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryEmail = params.get('email');
      if (queryEmail) return queryEmail;
      const stored = sessionStorage.getItem('signup_email');
      if (stored) return stored;
    }
    return '';
  });

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(() => {
    if (registered) {
      return "Your account has been created. Please check your email and verify your address before logging in.";
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('registered') === 'true') {
        return "Your account has been created. Please check your email and verify your address before logging in.";
      }
      if (sessionStorage.getItem('signup_success') === 'true') {
        sessionStorage.removeItem('signup_success');
        return "Your account has been created. Please check your email and verify your address before logging in.";
      }
    }
    return null;
  });

  // Keep state in sync if props update via router/parent navigation
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
    if (registered) {
      setSuccessMessage("Your account has been created. Please check your email and verify your address before logging in.");
    }
  }, [initialEmail, registered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else if (data?.session) {
        // Clean up signup session data on successful sign in
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('signup_email');
          sessionStorage.removeItem('signup_success');
        }
        // Only redirect when a real session exists after login
        window.location.href = "/";
      } else {
        setError("Check your email and confirm your account before logging in.");
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md bg-white border border-[#E8E5DE] p-6 sm:p-10 shadow-xs">
        {/* Brand Logo & Heading */}
        <div className="text-center pb-6 border-b border-[#E8E5DE]">
          <a href="/" className="inline-block">
            <img
              src="/sj-logo.svg"
              alt="SJ Collections"
              className="h-10 w-auto mx-auto object-contain"
            />
          </a>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] mt-4">
            Patron Sign In
          </h1>
          <p className="text-xs text-[#8A8882] mt-1.5">
            Access your orders, delivery addresses, and personal wishlist.
          </p>
        </div>

        {/* Success Message from registration */}
        {successMessage && (
          <div className="mt-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center leading-relaxed flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8A8882] absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#F9F8F4] border border-[#D8D4CC] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8A8882] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#F9F8F4] border border-[#D8D4CC] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-center mt-3">
              {error}
            </div>
          )}
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-[#E8E5DE] text-center space-y-3">
          <p className="text-xs text-[#8A8882]">
            New to SJ Collections?{' '}
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:opacity-75"
              >
                Create an account
              </button>
            ) : (
              <a
                href="/signup"
                className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:opacity-75"
              >
                Create an account
              </a>
            )}
          </p>

          <div>
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#8A8882] hover:text-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Atelier Home</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
