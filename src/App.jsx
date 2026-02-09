import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LockModal from './components/LockModal';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact'; 
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-brand-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (!user) return <Navigate to="/" replace />; 
  return children;
};

const Layout = () => {
  const location = useLocation();
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    // 👇 Wrapper Background Update
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans overflow-x-hidden flex flex-col relative">
      {!isAdminPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer onOpenAdmin={() => setIsLockModalOpen(true)} />}
      <LockModal isOpen={isLockModalOpen} onClose={() => setIsLockModalOpen(false)} />
    </div>
  );
};

function App() {
  return <Router><Layout /></Router>;
}

export default App;