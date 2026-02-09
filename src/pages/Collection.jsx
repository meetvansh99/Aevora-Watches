import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import { Loader } from 'lucide-react';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    // 1. Fetch Categories
    const unsubCat = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map(d => d.data().name));
    });

    // 2. Fetch Products
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubProd = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => { unsubCat(); unsubProd(); };
  }, []);

  // Filter Logic
  const filteredProducts = filterCategory === "All" 
    ? products 
    : products.filter(p => p.category === filterCategory);

  if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader className="animate-spin text-brand-accent" /></div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-text">The Collection</h1>
          <p className="text-brand-muted font-bold uppercase tracking-widest text-xs mt-2">Browse our exclusive drops</p>
        </div>

        {/* Categories Bar (Organic Style) */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilterCategory("All")}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              filterCategory === "All" 
                ? 'bg-brand-accent text-[#F2F0EB] shadow-lg' // Active: Deep Brown
                : 'bg-transparent border border-brand-primary/50 text-brand-muted hover:border-brand-accent hover:text-brand-text' // Inactive
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                filterCategory === cat 
                  ? 'bg-brand-accent text-[#F2F0EB] shadow-lg' 
                  : 'bg-transparent border border-brand-primary/50 text-brand-muted hover:border-brand-accent hover:text-brand-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-40 text-center uppercase font-black text-brand-primary/50 tracking-widest">No products found in this category</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;