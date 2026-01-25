import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdLock } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { talentApi } from '../../services/api';

const ResetPass = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from sessionStorage
    const savedEmail = sessionStorage.getItem('resetEmail');
    
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // If no email, redirect to check code page
      toast.error('Please verify your code first', {
        duration: 4000,
      });
      setTimeout(() => navigate('/checkpass'), 1500);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Please enter new password';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Show first error
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError, {
        duration: 4000,
        position: 'top-right',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // 3. Save new password
      const resetData = {
        email: email,
        newPassword: formData.newPassword
      };
      
      console.log('Resetting password with:', resetData);
      
      const response = await talentApi.resetPass(resetData);
      console.log('Reset password response:', response.data);
      
      toast.success('Password reset successfully!', {
        duration: 4000,
        position: 'top-right',
      });
      
      // Clear stored data
      sessionStorage.removeItem('resetEmail');
      
      // Get token if API returns it
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
      
    } catch (err) {
      console.error('Reset password error:', err);
      
      let errorMessage = 'An error occurred, please try again';
      
      if (err.response) {
        console.log('Error response:', err.response.data);
        
        if (err.response.status === 400) {
          errorMessage = err.response.data?.message || 'Error resetting password';
        } else if (err.response.status === 404) {
          errorMessage = 'User not found';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = 'Unable to connect to server. Check your internet connection';
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/checkpass');
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
              Set New Password
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <IoMdLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
                    errors.newPassword ? "text-red-500" : "text-gray-400"
                  }`} />
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                      errors.newPassword 
                        ? "border-red-500 focus:ring-red-300 bg-red-50" 
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility('newPassword')}
                  >
                    {showPassword.newPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Password must be at least 6 characters long
                </p>
              </div>
              
              {/* Confirm Password */}
              <div className="mb-8">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <IoMdLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
                    errors.confirmPassword ? "text-red-500" : "text-gray-400"
                  }`} />
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 outline-none transition ${
                      errors.confirmPassword 
                        ? "border-red-500 focus:ring-red-300 bg-red-50" 
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showPassword.confirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition flex items-center justify-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#163D5C] hover:bg-[#0f2a40]'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </span>
                  ) : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResetPass;