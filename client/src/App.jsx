import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            //   <Dashboard />
            // </ProtectedRoute>
            <Dashboard />
          }
        />
      </Routes>
    </>
  );
};

export default App;