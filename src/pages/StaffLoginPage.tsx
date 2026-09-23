import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const StaffLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Invalid email or password.');
        setLoading(false);
        return;
      }

      // Login successful
      alert('Login successful!');

      // Open the staff dashboard
      window.location.href = '/admin/dashboard';

    } catch (error) {
      console.error('Login error:', error);
      alert('Unable to connect to the server. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0f2b48] flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] mt-5">
            Staff Portal
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Sign in to access the clinic staff portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Staff Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@clinic.com"
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0f2b48] hover:bg-[#123b61] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />

            <p className="text-xs text-slate-500 leading-relaxed">
              This area is restricted to authorized clinic staff only.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};