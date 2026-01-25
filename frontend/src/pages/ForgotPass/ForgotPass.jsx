import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { MdEmail } from 'react-icons/md';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { talentApi } from '../../services/api';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address', {
        duration: 4000,
        position: 'top-right',
      });
      setError(true);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email format', {
        duration: 4000,
        position: 'top-right',
      });
      setError(true);
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Send reset code to email
      const response = await talentApi.forgotPass(email);
      console.log('Reset code sent:', response.data);
      
      toast.success('Verification code sent to your email!', {
        duration: 5000,
        position: 'top-right',
      });
      
      // Save email to sessionStorage
      sessionStorage.setItem('resetEmail', email);
      
      // Navigate to CheckPass page
      setTimeout(() => {
        navigate('/checkpass');
      }, 1500);
      
    } catch (err) {
      console.error('Forgot password error:', err);
      
      let errorMessage = 'An error occurred, please try again';
      
      if (err.response) {
        console.log('Error response:', err.response.data);
        
        if (err.response.status === 404) {
          errorMessage = 'No user found with this email address';
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.message || 'Invalid request';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      setError(true);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #86efac',
            },
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fca5a5',
            },
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
          },
        }}
        containerStyle={{
          top: 80,
          right: 20,
        }}
      />

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center bg-gray-100 py-10 px-4">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">
            <h2 className="text-3xl font-semibold text-center mb-2 text-gray-800">
              Reset Password
            </h2>
            
            <p className="text-gray-600 text-center mb-8">
              Enter your email address to receive a verification code.
              The code will be sent to your email.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MdEmail className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
                    error ? 'text-red-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(false);
                    }}
                    placeholder="example@gmail.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                      error 
                        ? 'border-red-500 focus:ring-red-300 bg-red-50' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#163D5C] hover:bg-[#0f2a40]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending code...
                  </span>
                ) : 'Send Code'}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <Link
                  to="/signin"
                  className="text-[#163D5C] font-semibold hover:underline inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPass;