import React, { useState } from 'react';
import '../styles/LoginSignup.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';

// Reusable InputField component for form fields
function InputField({ label, type, name, value, onChange }) {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} required />
        </div>
    );
}

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup mode
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_SERVER_URL; // API Base URL from environment variables

    // Handles input changes and updates formData state dynamically
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? `${baseUrl}/api/users/login` : `${baseUrl}/api/users/register`;
        const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(loginUser(data)); // Store user data in Redux
                sessionStorage.setItem('token', data.token); // Save JWT for session persistence
                sessionStorage.setItem('user', JSON.stringify(data.user)); // Store user details
                window.location.href = '/'; // Redirect to homepage after successful login/signup
            } else {
                setErrorMessage(data.message || 'An error occurred'); // Show API error message
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.'); // Handle fetch errors
        }
    };

    return (
        <div className="login-signup-container">
            <div className="form-box">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    
                    {/* Show Username field only for Sign Up mode */}
                    {!isLogin && <InputField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} />}
                    
                    <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    
                    <button type="submit" className="btn">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>

                {/* Toggle between Login and Signup modes */}
                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? ' Sign up' : ' Login'}</span>
                </p>
            </div>
        </div>
    );
}

export default LoginSignup;
