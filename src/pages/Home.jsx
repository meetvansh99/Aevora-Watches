import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader, ShoppingBag } from 'lucide-react';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA WATCHES";
  const tagline = import.meta.env.VITE_TAGLINE || "Natural Elegance";
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "products"), where("featured", "==", true), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFeaturedProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen pt-36 px-4 md:px-8 pb-32 overflow-x-hidden relative">
      
      {/* 👇 ORGANIC BACKGROUND BLOBS */}
      {/* Soft Dusty Rose Orb */}
      <div className="fixed top-[10%] left-[10%] w-[40rem] h-[40rem] bg-[#D8C3B8]/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
      {/* Muted Brown Orb */}
      <div className="fixed bottom-[10%] right-[10%] w-[40rem] h-[40rem] bg-[#3E2723]/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-8 mb-24 md:mb-40 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-brand-text uppercase leading-none select-none drop-shadow-sm opacity-90">
          {shopName}
        </h1>
        
        <p className="text-[10px] md:text-sm text-brand-muted font-black uppercase tracking-[0.6em] px-4">
          {tagline}
        </p>

        <div className="w-12 h-[2px] bg-brand-accent mt-4 opacity-20 rounded-full"></div>

        {/* Button: Deep Brown with Hover Effect */}
        <Link to="/shop" className="mt-8 group relative inline-flex items-center justify-center px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-300">
          <div className="absolute inset-0 bg-brand-accent border border-brand-accent rounded-full shadow-warm group-hover:bg-brand-text transition-all duration-300"></div>
          <span className="relative flex items-center gap-3 text-[#F2F0EB] group-hover:text-white transition-all">
            Explore Collection <ShoppingBag size={18} className="text-[#F2F0EB]" />
          </span>
        </Link>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-12 px-2 border-b border-brand-primary/50 pb-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-text leading-none">
              Featured
            </h2>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-brand-primary leading-none opacity-60">
              Drops
            </h2>
          </div>
          
          <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-text hover:text-brand-accent transition">
            View All <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader className="animate-spin text-brand-accent" size={48} /></div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-24 bg-brand-primary/10 backdrop-blur-md rounded-[3rem] border border-brand-primary/30">
            <p className="text-brand-muted font-black uppercase tracking-widest text-xs">Waiting for the next drop...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>
      <div className="h-32"></div>
    </div>
  );
};

export default Home;