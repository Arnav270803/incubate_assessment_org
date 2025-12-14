import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sweetApi } from '../utils/sweetApi';
import { toast } from 'react-toastify';
import { 
  LogOut, 
  Plus, 
  Search, 
  ShoppingCart, 
  Package, 
  Candy,
  X,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);

  // Form states
  const [newSweet, setNewSweet] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [restockQuantity, setRestockQuantity] = useState(1);

  // Fetch sweets on mount
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetApi.getAllSweets();
      if (response.success) {
        setSweets(response.sweets);
      }
    } catch (error) {
      toast.error('Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchSweets();
      return;
    }

    try {
      setLoading(true);
      const response = await sweetApi.searchSweets(searchQuery);
      if (response.success) {
        setSweets(response.sweets);
      }
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSweet = async (e) => {
    e.preventDefault();
    
    if (!newSweet.name || !newSweet.category || !newSweet.price || !newSweet.quantity) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await sweetApi.addSweet({
        name: newSweet.name,
        category: newSweet.category,
        price: Number(newSweet.price),
        quantity: Number(newSweet.quantity)
      });

      if (response.success) {
        toast.success('Sweet added successfully!');
        setShowAddModal(false);
        setNewSweet({ name: '', category: '', price: '', quantity: '' });
        fetchSweets();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add sweet');
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (purchaseQuantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    try {
      const response = await sweetApi.purchaseSweet(selectedSweet._id, purchaseQuantity);

      if (response.success) {
        toast.success('Purchase successful!');
        setShowPurchaseModal(false);
        setPurchaseQuantity(1);
        setSelectedSweet(null);
        fetchSweets();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Purchase failed');
    }
  };

  const handleRestock = async (e) => {
    e.preventDefault();

    if (restockQuantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    try {
      const response = await sweetApi.restockSweet(selectedSweet._id, restockQuantity);

      if (response.success) {
        toast.success('Restocked successfully!');
        setShowRestockModal(false);
        setRestockQuantity(1);
        setSelectedSweet(null);
        fetchSweets();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Restock failed');
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Candy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sweet Shop</h1>
                <p className="text-sm text-gray-600">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isAdmin() 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {isAdmin() ? '👑 Admin' : '👤 User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by name or category..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Search
            </button>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  fetchSweets();
                }}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Clear
              </button>
            )}
          </div>

          {isAdmin() && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
            >
              <Plus className="w-5 h-5" />
              Add Sweet
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Sweets</p>
                <p className="text-3xl font-bold text-gray-800">{sweets.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Candy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Stock</p>
                <p className="text-3xl font-bold text-gray-800">
                  {sweets.filter(s => s.quantity > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Out of Stock</p>
                <p className="text-3xl font-bold text-gray-800">
                  {sweets.filter(s => s.quantity === 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Sweets Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-16">
            <Candy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No sweets found</p>
            {isAdmin() && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
              >
                Add your first sweet
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
              <div
                key={sweet._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center">
                  <Candy className="w-16 h-16 text-white" />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {sweet.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-800">{sweet.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-purple-600">₹{sweet.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Stock:</span>
                      <span className={`font-medium ${
                        sweet.quantity === 0 ? 'text-red-600' : 
                        sweet.quantity < 10 ? 'text-orange-600' : 
                        'text-green-600'
                      }`}>
                        {sweet.quantity} units
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {sweet.quantity > 0 && (
                      <button
                        onClick={() => {
                          setSelectedSweet(sweet);
                          setShowPurchaseModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-medium"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy
                      </button>
                    )}
                    
                    {isAdmin() && (
                      <button
                        onClick={() => {
                          setSelectedSweet(sweet);
                          setShowRestockModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
                      >
                        <Package className="w-4 h-4" />
                        Restock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Sweet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Sweet</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddSweet} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newSweet.name}
                  onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Gulab Jamun"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newSweet.category}
                  onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Indian Sweets"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={newSweet.price}
                  onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newSweet.quantity}
                  onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  Add Sweet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedSweet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Purchase Sweet</h2>
              <button
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedSweet(null);
                  setPurchaseQuantity(1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedSweet.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Category: <span className="font-medium text-gray-800">{selectedSweet.category}</span>
                </p>
                <p className="text-gray-600">
                  Price: <span className="font-bold text-purple-600">₹{selectedSweet.price}</span>
                </p>
                <p className="text-gray-600">
                  Available: <span className="font-medium text-green-600">{selectedSweet.quantity} units</span>
                </p>
              </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1"
                  max={selectedSweet.quantity}
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{(selectedSweet.price * purchaseQuantity).toFixed(2)}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPurchaseModal(false);
                    setSelectedSweet(null);
                    setPurchaseQuantity(1);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && selectedSweet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Restock Sweet</h2>
              <button
                onClick={() => {
                  setShowRestockModal(false);
                  setSelectedSweet(null);
                  setRestockQuantity(1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedSweet.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Category: <span className="font-medium text-gray-800">{selectedSweet.category}</span>
                </p>
                <p className="text-gray-600">
                  Current Stock: <span className="font-medium text-orange-600">{selectedSweet.quantity} units</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleRestock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restock Quantity
                </label>
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">New Stock Level</p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedSweet.quantity + restockQuantity} units
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRestockModal(false);
                    setSelectedSweet(null);
                    setRestockQuantity(1);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;