import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { talentApi } from '../../services/api';

const CheckPass = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds (3 * 60 = 180)
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from sessionStorage
    const savedEmail = sessionStorage.getItem('resetEmail');
    
    if (savedEmail) {
      setEmail(savedEmail);
      
      // Check if there's a saved expiry time
      const savedExpiry = localStorage.getItem(`codeExpiry_${savedEmail}`);
      if (savedExpiry) {
        const expiryTime = parseInt(savedExpiry);
        const now = Date.now();
        const secondsLeft = Math.max(0, Math.floor((expiryTime - now) / 1000));
        
        if (secondsLeft > 0) {
          setTimeLeft(secondsLeft);
        } else {
          setIsCodeExpired(true);
          toast.error('Code has expired. Please request a new one.', {
            duration: 4000,
          });
          setTimeout(() => navigate('/forgotpass'), 2000);
        }
      } else {
        // Set default expiry (3 minutes from now)
        const expiry = Date.now() + (3 * 60 * 1000);
        localStorage.setItem(`codeExpiry_${savedEmail}`, expiry.toString());
      }
    } else {
      toast.error('Please enter your email address first', {
        duration: 4000,
      });
      setTimeout(() => navigate('/forgotpass'), 1500);
    }
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isCodeExpired) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsCodeExpired(true);
            clearInterval(timer);
            toast.error('Code has expired. Please request a new one.', {
              duration: 4000,
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isCodeExpired]);

  const handleCodeChange = (index, value) => {
    if (isCodeExpired) return;
    
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Move with arrow keys
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newCode = [...code];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newCode[index] = digit;
        }
      });
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleBack = () => {
    navigate('/forgotpass');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isCodeExpired) {
      toast.error('Code has expired. Please request a new one.', {
        duration: 4000,
      });
      return;
    }
    
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code', {
        duration: 4000,
        position: 'top-right',
      });
      setError(true);
      return;
    }
    
    if (!/^\d{6}$/.test(fullCode)) {
      toast.error('Code must contain only numbers', {
        duration: 4000,
        position: 'top-right',
      });
      setError(true);
      return;
    }
    
    setLoading(true);
    
    try {
      // Verify the code
      const checkData = {
        email: email,
        code: fullCode
      };
      
      const response = await talentApi.checkPass(checkData);
      console.log('Code check response:', response.data);
      
      // Clear expiry time on success
      localStorage.removeItem(`codeExpiry_${email}`);
      
      toast.success('Code verified successfully!', {
        duration: 4000,
        position: 'top-right',
      });
      
      // Navigate to ResetPass page
      setTimeout(() => {
        navigate('/resetpass');
      }, 1500);
      
    } catch (err) {
      console.error('Check code error:', err);
      
      let errorMessage = 'Invalid code. Please try again';
      
      if (err.response) {
        console.log('Error response:', err.response.data);
        
        if (err.response.status === 400) {
          errorMessage = 'Invalid or expired code';
        } else if (err.response.status === 404) {
          errorMessage = 'User not found';
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

  const handleResendCode = () => {
    if (!email) return;
    
    // Reset timer to 3 minutes
    setTimeLeft(180);
    setIsCodeExpired(false);
    
    // Set new expiry time (3 minutes from now)
    const newExpiry = Date.now() + (3 * 60 * 1000);
    localStorage.setItem(`codeExpiry_${email}`, newExpiry.toString());
    
    // Clear current code input
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    toast.promise(
      talentApi.forgotPass(email),
      {
        loading: 'Sending new code...',
        success: 'New code sent to your email!',
        error: 'Failed to send code'
      }
    );
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              Verify Code
            </h2>
            
            {/* Timer display above code input */}
            <div className="mb-6 text-center">
              {isCodeExpired ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">
                    Code has expired. Please request a new one.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Code expires in: <span className="font-semibold">{formatTime(timeLeft)}</span>
                  </p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex justify-center space-x-3 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={code[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isCodeExpired}
                      className={`w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isCodeExpired 
                          ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
                          : error 
                            ? 'border-red-500 focus:ring-red-300 bg-red-50' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      required
                      autoFocus={index === 0 && !isCodeExpired}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  ))}
                </div>
                
                <p className={`text-sm text-center ${error ? 'text-red-500' : 'text-gray-500'}`}>
                  {error ? 'Invalid code. Please try again.' : 'Enter the 6-digit code from your email'}
                </p>
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
                  disabled={loading || isCodeExpired || code.join('').length !== 6}
                  className={`flex-1 py-3 rounded-lg text-white font-semibold transition flex items-center justify-center ${
                    loading || isCodeExpired || code.join('').length !== 6 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#163D5C] hover:bg-[#0f2a40]'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Next
                      <FaArrowRight className="ml-2" />
                    </span>
                  )}
                </button>
              </div>

              {/* Resend button moved to bottom */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-4 text-center">
                  <div>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={!isCodeExpired}
                      className={`text-sm font-medium hover:underline ${
                        isCodeExpired 
                          ? 'text-blue-600 hover:text-blue-800' 
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CheckPass;