import React, { useState } from 'react';
import '../styles/LoginSignup.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure username is sent when registering
        const payload = isLogin 
            ? { email: formData.email, password: formData.password } 
            : formData; 
    
        try {
            const url = isLogin ? 'https://theatrum-server.onrender.com/api/users/login' : 'https://theatrum-server.onrender.com/api/users/register';
            console.log("Sending Payload:", payload); // Debugging line
    
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
            console.log("Response Status:", response.status);
            console.log("Response Data:", data);
    
            if (response.ok) {
                dispatch(loginUser(data));
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/';
            } else {
                setErrorMessage(data.message || 'An error occurred');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };
    
    return (
        <div className="login-signup-container">
            <div className="form-box">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {!isLogin && (
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? ' Sign up' : ' Login'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginSignup;
