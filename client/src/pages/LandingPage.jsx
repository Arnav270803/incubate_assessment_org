import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../auth/Login';
import { Candy, ShoppingBag, TrendingUp, Shield } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
            <Candy className="w-10 h-10 text-purple-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Sweet Shop Manager
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Manage your sweet inventory, track sales, and delight your customers with our easy-to-use platform
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <ShoppingBag className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Purchases</h3>
            <p className="text-white/80">
              Quick and seamless sweet purchasing process for customers
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <TrendingUp className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inventory Tracking</h3>
            <p className="text-white/80">
              Real-time stock management and automatic updates
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
            <Shield className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Admin Controls</h3>
            <p className="text-white/80">
              Powerful admin tools for adding and restocking sweets
            </p>
          </div>
        </div>

        {/* Login Component */}
        <div className="max-w-md mx-auto">
          <Login />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-white/70">
        <p>&copy; 2024 Sweet Shop Manager. Built with ❤️</p>
      </div>
    </div>
  );
};

export default LandingPage;