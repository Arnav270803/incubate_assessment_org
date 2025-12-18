
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // New: Import real useAuth
import { useNavigate } from 'react-router-dom'; // New: For redirection
import { toast } from 'react-toastify'; // New: Use toast instead of alert
import { Candy, ShoppingBag, TrendingUp, Shield, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth(); // New: Use real auth functions
  const navigate = useNavigate(); // New: For redirect

  const handleSubmit = async (e) => { // Changed to async (e) for form
    e.preventDefault(); // New: Prevent default form submit

    if (!email || !password) {
      toast.error('Please fill all fields'); // Changed to toast
      return;
    }

    setLoading(true);

    try {
      const result = isLogin 
        ? await login(email, password)
        : await register(email, password);

      if (result.success) {
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
        navigate('/dashboard'); // New: Redirect to dashboard
      } else {
        toast.error(result.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Login Component - Top */}
        <div className="max-w-md mx-auto mb-16">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl mb-4 shadow-xl shadow-gray-900/50 transform hover:scale-105 transition-transform duration-300">
                <Candy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
                Sweet Shop
              </h1>
              <p className="text-gray-600">
                {isLogin ? 'Welcome back!' : 'Create your account'}
              </p>
            </div>

            {/* Form */} 
            <form onSubmit={handleSubmit} className="space-y-5"> {/* New: Wrap in form for submit */}
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit" // New: type=submit for form
                disabled={loading}
                className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-3.5 rounded-xl font-semibold hover:from-gray-900 hover:to-gray-800 shadow-lg shadow-gray-900/30 hover:shadow-xl hover:shadow-gray-900/50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {isLogin ? 'Login' : 'Register'}
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
                disabled={loading}
              >
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </div>

            {/* Admin Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                <span className="font-semibold text-gray-900">Note:</span> First registered user becomes admin automatically
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section - Bottom */}
        <div className="text-center mb-12 mt-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 shadow-2xl shadow-gray-900/50 transform hover:scale-105 transition-transform duration-300">
            <Candy className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Sweet Shop Manager
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Manage your sweet inventory, track sales, and delight your customers with our intuitive platform
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="group bg-white rounded-2xl p-8 shadow-2xl shadow-gray-900/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gray-900/50">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Purchases</h3>
            <p className="text-gray-600 leading-relaxed">
              Quick and seamless sweet purchasing process for customers
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-2xl shadow-gray-900/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gray-900/50">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Inventory Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Real-time stock management and automatic updates
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-2xl shadow-gray-900/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gray-900/50">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Admin Controls</h3>
            <p className="text-gray-600 leading-relaxed">
              Powerful admin tools for adding and restocking sweets
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-400">
        <p>&copy; 2024 Sweet Shop Manager. Built with ❤️</p>
      </div>
    </div>
  );
};

export default LandingPage;
















