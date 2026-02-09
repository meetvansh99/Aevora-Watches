import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, ArrowRight } from 'lucide-react';

const LockModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onClose();
      navigate('/admin'); 
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    // Overlay: Warm Brown Tint
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-accent/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      
      {/* Modal Card: Creamy Background */}
      <div className="bg-[#F2F0EB] rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border border-brand-primary/50 scale-100 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-brand-primary/10 rounded-full hover:bg-brand-primary/30 text-brand-muted transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-6">
          {/* Lock Icon: Deep Coffee Brown */}
          <div className="w-16 h-16 bg-brand-accent text-[#F2F0EB] rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[#F2F0EB]">
            <Lock size={32} />
          </div>
          
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-brand-text">Restricted</h3>
            <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mt-1">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleUnlock} className="relative">
            <input 
              type="password" 
              placeholder="Enter Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-white border-2 rounded-xl px-4 py-3 text-center font-bold tracking-widest text-brand-text placeholder-brand-primary/50 focus:outline-none focus:border-brand-accent transition-all ${
                error ? "border-red-400 bg-red-50 text-red-500" : "border-brand-primary/30"
              }`}
              autoFocus
            />
            
            <button 
              type="submit"
              className="absolute right-2 top-2 p-1.5 bg-brand-accent text-[#F2F0EB] rounded-lg hover:scale-105 transition-transform shadow-md"
            >
              <ArrowRight size={20} />
            </button>
          </form>
          
          {error && (
            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              Access Denied: Invalid Key
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockModal;