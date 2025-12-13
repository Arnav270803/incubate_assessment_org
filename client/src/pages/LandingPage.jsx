import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../auth/Login';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Sweet Shop Management System
        </h1>

        <p className="text-gray-600 mb-6">
          Manage sweets inventory, purchase items, and restock products.
        </p>

        {!user ? (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full bg-blue-600 text-white py-2 rounded mb-3"
            >
              Login
            </button>

            <p className="text-sm text-gray-500">
              Please login to continue
            </p>
          </>
        ) : (
          <>
            <p className="mb-4 text-green-600">
              Logged in as <strong>{user.email}</strong>
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default LandingPage;
