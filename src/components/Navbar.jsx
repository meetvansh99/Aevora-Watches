import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 pt-6">
        {/* 👇 Warm Creamy Glass Navbar */}
        <div className="rounded-full px-6 md:px-8 py-4 flex justify-between items-center max-w-7xl mx-auto border border-brand-primary/50 shadow-warm bg-brand-bg/80 backdrop-blur-xl transition-all duration-300">
          
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-brand-text uppercase hover:text-brand-accent transition-colors" onClick={() => setIsOpen(false)}>
            {shopName}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${isActive(link.path) ? "text-brand-accent" : "text-brand-muted hover:text-brand-text"}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-brand-accent transition-all duration-300 ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            ))}
          </div>

          <button className="md:hidden p-2 text-brand-text bg-brand-primary/20 rounded-full hover:bg-brand-primary/40 transition active:scale-90" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-brand-bg/95 backdrop-blur-xl flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-3 bg-brand-primary/20 rounded-full text-brand-text hover:bg-brand-primary/40 transition active:scale-90">
          <X size={28} />
        </button>

        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={`text-4xl font-black uppercase tracking-tight transition-colors ${isActive(link.path) ? "text-brand-accent" : "text-brand-muted hover:text-brand-text"}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;