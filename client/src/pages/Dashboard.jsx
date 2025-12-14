


import { useState, useEffect } from 'react';
import { 
  LogOut, 
  Plus, 
  Search, 
  ShoppingCart, 
  Package, 
  Candy,
  X,
  TrendingUp,
  Edit, // New: For update
  Trash // New: For delete
} from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // New: Real useAuth
import { sweetApi } from '../utils/sweetApi'; // New: Real sweetApi
import { toast } from 'react-toastify'; // New: Real toast
import { useNavigate } from 'react-router-dom'; // New: For logout redirect if needed

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth(); // Replaced mock
  const navigate = useNavigate(); // New: Optional for redirect after logout
  const [sweets, setSweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(''); // New: For price range
  const [maxPrice, setMaxPrice] = useState(''); // New: For price range
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // New: Update modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // New: Delete confirm
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
  const [updateSweetData, setUpdateSweetData] = useState({ // New: For update form
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  // Fetch sweets on mount
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetApi.getAllSweets(); // Replaced mock
      if (response.success) {
        setSweets(response.sweets);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch sweets'); // Real toast
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await sweetApi.searchSweets(searchQuery, minPrice, maxPrice); // Updated with price range
      if (response.success) {
        setSweets(response.sweets);
      }
    } catch (error) {
      toast.error(error.message || 'Search failed');
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
      }
    } catch (error) {
      toast.error(error.message || 'Restock failed');
    }
  };

  // New: Handle update sweet
  const handleUpdateSweet = async (e) => {
    e.preventDefault();

    if (!updateSweetData.name || !updateSweetData.category || !updateSweetData.price || updateSweetData.quantity === undefined) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await sweetApi.updateSweet(selectedSweet._id, {
        name: updateSweetData.name,
        category: updateSweetData.category,
        price: Number(updateSweetData.price),
        quantity: Number(updateSweetData.quantity)
      });

      if (response.success) {
        toast.success('Sweet updated successfully!');
        setShowUpdateModal(false);
        setSelectedSweet(null);
        fetchSweets();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update sweet');
    }
  };

  // New: Handle delete sweet
  const handleDeleteSweet = async () => {
    try {
      const response = await sweetApi.deleteSweet(selectedSweet._id);

      if (response.success) {
        toast.success('Sweet deleted successfully!');
        setShowDeleteConfirm(false);
        setSelectedSweet(null);
        fetchSweets();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete sweet');
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/'); // New: Redirect to landing after logout
  };

  // New: Open update modal with pre-filled data
  const openUpdateModal = (sweet) => {
    setSelectedSweet(sweet);
    setUpdateSweetData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity
    });
    setShowUpdateModal(true);
  };

  // New: Open delete confirm
  const openDeleteConfirm = (sweet) => {
    setSelectedSweet(sweet);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-md">
                <Candy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sweet Shop</h1>
                <p className="text-sm text-gray-500">{user?.email}</p> {/* Changed to email */}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                isAdmin() 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
                {isAdmin() ? '👑 Admin' : '👤 User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition border border-gray-300"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
              />
            </div>
            {/* New: Price range inputs */}
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
              className="w-28 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              className="w-28 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-md hover:shadow-lg"
            >
              Search
            </button>
            {(searchQuery || minPrice || maxPrice) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setMinPrice('');
                  setMaxPrice('');
                  fetchSweets();
                }}
                className="px-4 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition border border-gray-300 shadow-sm"
              >
                Clear
              </button>
            )}
          </div>

          {isAdmin() && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-md hover:shadow-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Sweet
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Sweets</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{sweets.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center shadow-md">
                <Candy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {sweets.filter(s => s.quantity > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Out of Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {sweets.filter(s => s.quantity === 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Sweets Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-16">
            <Candy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No sweets found</p>
            {isAdmin() && (
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 text-emerald-600 hover:text-emerald-700 font-semibold"
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-200"
              >
                <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Candy className="w-16 h-16 text-white" />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {sweet.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Category:</span>
                      <span className="font-semibold text-gray-900">{sweet.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Price:</span>
                      <span className="font-bold text-gray-900">₹{sweet.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Stock:</span>
                      <span className={`font-semibold ${
                        sweet.quantity === 0 ? 'text-red-600' : 
                        sweet.quantity < 10 ? 'text-orange-600' : 
                        'text-emerald-600'
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
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-semibold shadow-md hover:shadow-lg"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy
                      </button>
                    )}
                    
                    {isAdmin() && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedSweet(sweet);
                            setShowRestockModal(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-md hover:shadow-lg"
                        >
                          <Package className="w-4 h-4" />
                          Restock
                        </button>
                        <button
                          onClick={() => openUpdateModal(sweet)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm shadow-md hover:shadow-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(sweet)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm shadow-md hover:shadow-lg"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </>
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Sweet</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddSweet} className="space-y-4"> {/* Wrapped in form */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newSweet.name}
                  onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
                  placeholder="e.g., Gulab Jamun"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newSweet.category}
                  onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
                  placeholder="e.g., Indian Sweets"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={newSweet.price}
                  onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newSweet.quantity}
                  onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold shadow-md hover:shadow-lg"
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Purchase Sweet</h2>
              <button
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedSweet(null);
                  setPurchaseQuantity(1);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedSweet.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Category: <span className="font-semibold text-gray-900">{selectedSweet.category}</span>
                </p>
                <p className="text-gray-600">
                  Price: <span className="font-bold text-gray-900">₹{selectedSweet.price}</span>
                </p>
                <p className="text-gray-600">
                  Available: <span className="font-semibold text-emerald-600">{selectedSweet.quantity} units</span>
                </p>
              </div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-4"> {/* Wrapped in form */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
                  min="1"
                  max={selectedSweet.quantity}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-medium">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
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
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold shadow-md hover:shadow-lg"
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Restock Sweet</h2>
              <button
                onClick={() => {
                  setShowRestockModal(false);
                  setSelectedSweet(null);
                  setRestockQuantity(1);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedSweet.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Category: <span className="font-semibold text-gray-900">{selectedSweet.category}</span>
                </p>
                <p className="text-gray-600">
                  Current Stock: <span className="font-semibold text-orange-600">{selectedSweet.quantity} units</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleRestock} className="space-y-4"> {/* Wrapped in form */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Restock Quantity
                </label>
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 shadow-sm"
                  min="1"
                />
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 shadow-sm">
                <p className="text-sm text-gray-600 mb-1 font-medium">New Stock Level</p>
                <p className="text-2xl font-bold text-emerald-700">
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
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold shadow-md hover:shadow-lg"
                >
                  Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New: Update Sweet Modal */}
      {showUpdateModal && selectedSweet && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Update Sweet</h2>
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedSweet(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateSweet} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={updateSweetData.name}
                  onChange={(e) => setUpdateSweetData({ ...updateSweetData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                  placeholder="e.g., Gulab Jamun"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={updateSweetData.category}
                  onChange={(e) => setUpdateSweetData({ ...updateSweetData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                  placeholder="e.g., Indian Sweets"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={updateSweetData.price}
                  onChange={(e) => setUpdateSweetData({ ...updateSweetData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={updateSweetData.quantity}
                  onChange={(e) => setUpdateSweetData({ ...updateSweetData, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedSweet(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md hover:shadow-lg"
                >
                  Update Sweet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New: Delete Confirm Modal */}
      {showDeleteConfirm && selectedSweet && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Delete Sweet</h2>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedSweet(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6 text-center">
              <p className="text-lg text-gray-700">
                Are you sure you want to delete <span className="font-bold text-gray-900">{selectedSweet.name}</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedSweet(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSweet}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-md hover:shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;