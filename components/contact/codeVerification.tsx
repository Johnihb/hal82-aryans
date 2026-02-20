'use client'
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const VerifyCode = ({ phoneNumber}: { phoneNumber: string;}) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVerifyCode = async (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await fetch("/api/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });

      const data = await result.json();

      if (result.ok) {
        setMessage('Verification successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setError(data.error || 'Invalid verification code');
      }
    } catch (e) {
      setError('Verification failed. Please try again.');
      console.error("Verification error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`w-full max-w-md relative transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex transition-all duration-500 scale-110 rotate-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl blur-lg opacity-40"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-8 h-8 text-white rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Verify Code
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                We sent a 6-digit code to +{phoneNumber}
              </p>
            </div>
          </div>

          {/* Verification Code Input */}
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setCode(value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && code.length === 6 && !isLoading) {
                      handleVerifyCode(e);
                    }
                  }}
                  placeholder="• • • • • •"
                  maxLength={6}
                  autoFocus
                  className="w-full px-6 py-6 bg-gray-50 border-2 border-gray-200 rounded-2xl text-center text-4xl font-light tracking-[1em] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 focus:bg-white transition-all duration-300"
                />
                {code.length === 6 && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-600 animate-scaleIn">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Code expires in 15 minutes
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-800 px-5 py-4 rounded-xl text-sm flex items-start gap-3 animate-slideDown">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border-2 border-green-100 text-green-800 px-5 py-4 rounded-xl text-sm flex items-start gap-3 animate-slideDown">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleVerifyCode}
                disabled={code.length !== 6 || isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl text-base font-semibold shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <Link
                href="/contacts"
                className="w-full text-sm text-gray-600 hover:text-gray-900 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                ← Use different number
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500 leading-relaxed">
              Protected by industry-standard encryption.<br />
              Your data is safe with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;