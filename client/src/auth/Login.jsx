import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';

const Login = () => {
  const { setShowLogin = () => {} } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Phase 0: no auth logic yet
    console.log('Login submitted (stub)', { email, password });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded"
        >
          Continue
        </button>

        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="w-full mt-4 text-sm text-gray-500"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default Login;
