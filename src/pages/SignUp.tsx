import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface SignUpProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Store in sessionStorage to ensure pre-fill even across full reloads
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('signup_email', email);
        sessionStorage.setItem('signup_success', 'true');
      }

      // Redirect to Sign In page with email prefilled and registered flag
      if (onNavigate) {
        onNavigate('signin', { email, registered: 'true' });
      } else {
        window.location.href = `/login?email=${encodeURIComponent(email)}&registered=true`;
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
            Join the SJ Registry
          </h1>
          <p className="text-xs text-[#8A8882] mt-1.5">
            Create an account to manage your luxury orders and saved preferences.
          </p>
        </div>

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
            {isLoading ? 'Creating Account...' : 'Sign Up'}
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
            Already registered?{' '}
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('signin')}
                className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:opacity-75"
              >
                Sign In
              </button>
            ) : (
              <a
                href="/signin"
                className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:opacity-75"
              >
                Sign In
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

export default SignUp;
