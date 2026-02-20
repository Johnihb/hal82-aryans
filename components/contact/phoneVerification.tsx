
'use client'
import React, { ChangeEvent, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value);
    setError('');
    
    if (value.length === 13) {
      const validPhoneNumberRegex = /^\+\d{1,3}\d{9,14}$/;
      const isValid = validPhoneNumberRegex.test('+' + value);
      setIsValidPhoneNumber(isValid);
      if (!isValid) {
        setError('Invalid phone number format');
      }
    } else {
      setIsValidPhoneNumber(false);
    }
  };

  const handleSendSMS = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const validPhoneNumberRegex = /^\+\d{1,3}\d{9,14}$/;
      const validatePhoneNumber = validPhoneNumberRegex.test('+' + phoneNumber);
      setIsValidPhoneNumber(validatePhoneNumber);

      if (!validatePhoneNumber) {
        setError('Invalid phone number format');
        throw new Error('Invalid Number Pattern.');
      }

      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: phoneNumber }),
      });

      const data = await res.json();
      
      if (res.ok) {
        router.push('contacts/verify-user')
      } else {
        setError(data.error || 'Failed to send SMS');
      }
    } catch (e) {
      setError('Failed to send verification code');
      console.error("Error in SMS send:", e);
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
            <div className="inline-flex transition-all duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl blur-lg opacity-40"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enter your phone number to get started
              </p>
            </div>
          </div>

          {/* Phone Input */}
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <span className="absolute left-5 text-gray-500 font-medium text-lg pointer-events-none">
                    +
                  </span>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="1234567890123"
                    maxLength={13}
                    className="w-full pl-10 pr-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 text-lg placeholder:text-gray-300 focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 transition-all duration-300"
                  />
                  {phoneNumber.length === 13 && isValidPhoneNumber && (
                    <div className="absolute right-5 text-green-600 animate-scaleIn">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Include country code (13 digits total)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-800 px-5 py-4 rounded-xl text-sm flex items-start gap-3 animate-slideDown">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleSendSMS}
                disabled={phoneNumber.length !== 13 || isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl text-base font-semibold shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Code...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Continue
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </Button>

              <div className="flex justify-end">
                <a 
                  href="/contacts/verify-user"
                  className="text-sm text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium inline-flex items-center gap-1.5"
                >
                  Already have a code
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
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

export default PhoneInput