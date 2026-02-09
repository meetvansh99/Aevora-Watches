import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-[#F2F0EB] text-brand-accent">
      <Loader className="animate-spin" size={32} />
      <span className="text-xs font-black uppercase tracking-widest">Verifying Access...</span>
    </div>
  );

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;