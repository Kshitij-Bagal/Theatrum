import React, { useState } from 'react';
import '../styles/LoginSignup.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';

function InputField({ label, type, name, value, onChange }) {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} required />
        </div>
    );
}

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_SERVER_URL;

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
                dispatch(loginUser(data));
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/';
            } else {
                setErrorMessage(data.message || 'An error occurred');
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-signup-container">
            <div className="form-box">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {!isLogin && <InputField label="Username" type="text" name="username" value={formData.username} onChange={handleChange} />}
                    <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit" className="btn">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? ' Sign up' : ' Login'}</span>
                </p>
            </div>
        </div>
    );
}

export default LoginSignup;
