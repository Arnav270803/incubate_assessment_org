import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onClose }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    try {
      login(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 text-sm text-gray-500"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default Login;
