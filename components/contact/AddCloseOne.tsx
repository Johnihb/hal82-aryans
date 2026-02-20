'use client'
import { Button } from '@/components/ui/button';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Plus, Trash2, Send, CheckCircle2, Phone, Loader2 } from 'lucide-react';
import { deleteNumber } from '@/lib/user';

interface CloseOnePhoneNumber {
  id: string;
  phoneNumber: string;
  name: string;
  isVerified: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCloseOneData {
  id: string;
  closeOnePhoneNumbers: CloseOnePhoneNumber[];
}

interface PageProps {
  initialData?: {
    success: boolean;
    count?: number;
    userCloseOne?: UserCloseOneData;
  };
}

const Page = ({ initialData }: PageProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<CloseOnePhoneNumber[]>(
    initialData?.userCloseOne?.closeOnePhoneNumbers || []
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [verify, setVerify] = useState('');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const maxPhoneNumbers = 5;
  const currentCount = initialData?.count || phoneNumbers.length;
  const canAddMore = currentCount < maxPhoneNumbers;

  useEffect(() => {
    if (initialData?.userCloseOne?.closeOnePhoneNumbers) {
      setPhoneNumbers(initialData.userCloseOne.closeOnePhoneNumbers);
    }
  }, [initialData]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value);
    setError('');
    
    if (value.length === 13) {
      const validPhoneNumberRegex = /^\+\d{1,3}\d{9,14}$/;
      const isValid = validPhoneNumberRegex.test('+' + value);
      if (!isValid) {
        setError('Invalid phone number format');
      }
    } 
  };

  const handleAddPhone = async (e: React.MouseEvent) => {
    e.preventDefault();

    const validPhoneNumberRegex = /^\+\d{1,3}\d{9,14}$/;
    const isValid = validPhoneNumberRegex.test('+' + phoneNumber);
    if (!isValid) {
      setError('Invalid phone number format');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/send-sms-closeOne', {
        method: 'POST',
        body: JSON.stringify({ to: phoneNumber, name }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        setError('Failed to send verification code');
        return;
      }

      const data = await response.json();
      
      // Add the new phone number to the list (unverified)
      const newPhone: CloseOnePhoneNumber = {
        id: data.id || Date.now().toString(),
        phoneNumber: phoneNumber,
        name: name,
        isVerified: false,
        userId: initialData?.userCloseOne?.id || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setPhoneNumbers([...phoneNumbers, newPhone]);
      setVerifyingId(newPhone.id);
      setShowForm(false);
      setPhoneNumber('');
      setName('');
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (phoneId: string) => {
    if (!verify) return;

    setLoading(true);
    const phone = phoneNumbers.find(p => p.id === phoneId);
      if (!phone) {
    setError('Phone number not found');
    return;
  }
   
  setLoading(true);
    try {
      const response = await fetch('/api/verify-closeOne', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber: phone?.phoneNumber, code: verify }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        setError('Invalid verification code');
        return;
      }

      // Update the phone number to verified
      setPhoneNumbers(phoneNumbers.map(p => 
        p.id === phoneId ? { ...p, isVerified: true } : p
      ));
      setVerifyingId(null);
      setVerify('');
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (phoneNumber: string) => {
    setLoading(true);
    try {
      await deleteNumber(phoneNumber);

      setPhoneNumbers(phoneNumbers.filter(p => p.phoneNumber !== phoneNumber));
      const phoneNumberId = phoneNumbers.find(phoneNum=>phoneNum.phoneNumber === phoneNumber )
      if (verifyingId === phoneNumberId?.id) {
        setVerifyingId(null);
        setVerify('');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mb-2">
              <Phone className="w-7 h-7 text-slate-700" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800">Phone Verification</h1>
            <p className="text-sm text-slate-500">
              {currentCount} of {maxPhoneNumbers} phone numbers added
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Existing Phone Numbers */}
          {phoneNumbers.length > 0 && (
            <div className="space-y-3">
              {phoneNumbers.map((phone) => (
                <div key={phone.id} className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200">
                        <Phone className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{phone.name}</p>
                        <p className="text-sm text-slate-500">{(phone.phoneNumber)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {phone.isVerified ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-xs font-medium">Verified</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setVerifyingId(phone.id)}
                          className="text-xs font-medium text-slate-600 hover:text-slate-800 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors duration-200"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(phone.phoneNumber)}
                        disabled={loading}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                        aria-label={`Delete ${phone.phoneNumber}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Verification Input */}
                  {verifyingId === phone.id && !phone.isVerified && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 ml-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Verification Code</label>
                        <input
                          type="text"
                          value={verify}
                          onChange={(e) => setVerify(e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest"
                          placeholder="Enter code"
                          maxLength={6}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-xl"
                          onClick={() => {
                            setVerifyingId(null);
                            setVerify('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleVerify(phone.id)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 rounded-xl"
                          disabled={!verify || loading}
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                          )}
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add New Phone Number */}
          {!showForm && canAddMore && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Phone Number</span>
            </button>
          )}

          {!canAddMore && !showForm && (
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600">
                Maximum phone numbers reached ({maxPhoneNumbers})
              </p>
            </div>
          )}

          {showForm && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="closeone-name">Name</label>
                <input
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
                  value={name}
                  id="closeone-name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">+</span>
                  <input
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    type="text"
                    placeholder="1234567890123"
                    maxLength={13}
                  />
                </div>
                <p className="text-xs text-slate-500">13 digits required</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                    setPhoneNumber('');
                    setName('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-slate-800 hover:bg-slate-700 rounded-xl"
                  disabled={phoneNumber.length !== 13 || !name || loading}
                  onClick={handleAddPhone}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Code
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;