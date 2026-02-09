import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X } from 'lucide-react';

import AdminCategories from '../components/AdminCategories';
import AdminProducts from '../components/AdminProducts';
import AdminFeatured from '../components/AdminFeatured';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to exit the Admin Panel?")) {
      try {
        await signOut(auth);
        // Auth Guard (App.jsx) handle karega redirect
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  };

  const menuItems = [
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: LayoutDashboard },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row relative">
      
      {/* --- SIDEBAR (Deep Coffee Brown) --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-accent text-[#F2F0EB] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col border-r border-brand-primary/20 shadow-2xl`}>
        
        <div className="p-8 border-b border-[#F2F0EB]/10">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">AEVORA ADMIN</h2>
        </div>
        
        <nav className="p-4 flex-grow space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} 
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? 'bg-[#F2F0EB] text-brand-accent shadow-lg' // Active State: Cream Bg, Brown Text
                  : 'text-brand-primary hover:text-[#F2F0EB] hover:bg-brand-primary/10' // Inactive State
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-[#F2F0EB]/10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-red-950/40 text-red-200 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-600 hover:text-white transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-64">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-brand-bg/80 backdrop-blur-xl p-4 flex justify-between items-center sticky top-0 z-40 border-b border-brand-primary/20">
          <h2 className="text-xs font-black uppercase italic text-brand-text">Admin Hub</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-brand-accent text-[#F2F0EB] rounded-xl active:scale-90 transition-all">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="p-4 md:p-16">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-12">
              <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-brand-text leading-none">
                {menuItems.find(i => i.id === activeTab)?.label} <span className="text-brand-primary/40">Hub</span>
              </h1>
            </div>
            
            {/* Dashboard Content Container: Creamy Glass Card */}
            <div className="bg-brand-bg/60 backdrop-blur-2xl rounded-[2rem] md:rounded-[3.5rem] p-4 md:p-10 border border-brand-primary/30 min-h-[500px] shadow-warm">
              {activeTab === 'categories' && <AdminCategories />}
              {activeTab === 'products' && <AdminProducts />}
              {activeTab === 'featured' && <AdminFeatured />}
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-accent/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default AdminDashboard;