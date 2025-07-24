import React, { useState, useEffect } from 'react';

const DynamicLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Dynamically show the form after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes with proper event handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Alert the values as requested
      alert(`Login Attempt:\nEmail: ${formData.email}\nPassword: ${formData.password}`);
      
      // Here you would typically handle the actual login logic
      console.log('Login successful:', formData);
    }
  };

  return (
    <div className="page-container">
      <div className="background-overlay"></div>
      
      <div className="content-wrapper">
        <div className={`login-form ${isFormVisible ? 'visible' : ''}`}>
          <h1 className="login-heading">Login</h1>
          
          <div className="form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
            >
              <span className="button-text">Login</span>
              <div className="button-ripple"></div>
            </button>
          </div>
          
          <div className="form-footer">
            <p className="helper-text">
              Test with any email format and password (min 6 characters)
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-container {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .background-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .content-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1;
        }

        .login-form {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 50px;
          border-radius: 24px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          width: 100%;
          max-width: 450px;
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .login-form.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .login-heading {
          text-align: center;
          margin-bottom: 40px;
          color: #1a1a1a;
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: textGradient 4s ease infinite;
          letter-spacing: -1px;
        }

        @keyframes textGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        }

        .form-label {
          font-weight: 600;
          color: #374151;
          font-size: 1rem;
          margin-left: 8px;
          transition: color 0.3s ease;
        }

        .form-input {
          padding: 18px 24px;
          border: 2px solid rgba(156, 163, 175, 0.3);
          border-radius: 16px;
          font-size: 1.1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          color: #1f2937;
          font-weight: 500;
        }

        .form-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 0 0 4px rgba(102, 126, 234, 0.1),
            0 10px 25px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .form-input.error {
          border-color: #ef4444;
          background: rgba(254, 242, 242, 0.9);
          animation: shake 0.6s ease-in-out;
        }

        .form-input.error:focus {
          border-color: #ef4444;
          box-shadow: 
            0 0 0 4px rgba(239, 68, 68, 0.1),
            0 10px 25px rgba(239, 68, 68, 0.15);
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        .error-message {
          color: #ef4444;
          font-size: 0.9rem;
          margin-left: 8px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .error-message::before {
          content: '⚠';
          font-size: 0.8rem;
        }

        .login-button {
          padding: 20px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 200% 200%;
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-top: 15px;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(102, 126, 234, 0.4),
            0 0 50px rgba(240, 147, 251, 0.3);
          background-position: 100% 0;
          animation: buttonGlow 2s ease infinite;
        }

        .login-button:active {
          transform: translateY(-1px) scale(1.01);
        }

        @keyframes buttonGlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .button-text {
          position: relative;
          z-index: 2;
        }

        .button-ripple {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
          z-index: 1;
        }

        .login-button:hover .button-ripple {
          left: 100%;
        }

        .form-footer {
          margin-top: 30px;
          text-align: center;
        }

        .helper-text {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
          font-weight: 500;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 15px;
          }

          .login-form {
            padding: 40px 30px;
            max-width: 100%;
          }

          .login-heading {
            font-size: 2.5rem;
            margin-bottom: 35px;
          }

          .form-input {
            padding: 16px 20px;
            font-size: 1rem;
          }

          .login-button {
            padding: 18px 28px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .login-form {
            padding: 35px 25px;
          }

          .login-heading {
            font-size: 2.2rem;
          }

          .form-input {
            padding: 14px 18px;
          }

          .login-button {
            padding: 16px 24px;
            font-size: 1rem;
          }
        }

        @media (max-width: 320px) {
          .login-form {
            padding: 30px 20px;
          }

          .login-heading {
            font-size: 2rem;
          }
        }

        /* Landscape orientation for mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .content-wrapper {
            padding: 10px;
          }
          
          .login-form {
            padding: 25px;
          }
          
          .login-heading {
            font-size: 2rem;
            margin-bottom: 20px;
          }
          
          .form {
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicLoginForm;