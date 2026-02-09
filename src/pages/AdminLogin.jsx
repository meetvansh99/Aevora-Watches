import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Key, Loader, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError("Invalid Credentials. Access Denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4 relative overflow-hidden">
      
      {/* Organic Background Decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-brand-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>

      {/* Login Card: Creamy Glass */}
      <div className="bg-brand-bg/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-warm w-full max-w-md border border-brand-primary/30 relative z-10">
        
        <Link to="/" className="absolute top-6 left-6 text-brand-primary hover:text-brand-accent transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-accent text-[#F2F0EB] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-[#F2F0EB]">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-text">Admin Panel</h2>
          <p className="text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mt-2">
            Secure Entry Point
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-bold p-3 rounded-xl text-center mb-6 animate-pulse uppercase tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-primary group-focus-within:text-brand-accent transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-transparent rounded-xl text-sm font-bold text-brand-text focus:bg-white focus:border-brand-accent focus:outline-none transition-all placeholder-brand-primary/50"
                required
              />
            </div>
          </div>
          
          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-primary group-focus-within:text-brand-accent transition-colors">
                <Key size={18} />
              </div>
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-transparent rounded-xl text-sm font-bold text-brand-text focus:bg-white focus:border-brand-accent focus:outline-none transition-all placeholder-brand-primary/50"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-accent text-[#F2F0EB] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-text transition-all active:scale-95 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : "Authenticate"}
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest">
            Protected by Aevora Security
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;