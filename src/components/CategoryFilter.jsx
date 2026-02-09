import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(cats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 'All' Button */}
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-5 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
          activeCategory === "All"
            ? "bg-brand-accent text-[#F2F0EB] border-brand-accent shadow-lg scale-105"
            : "bg-transparent text-brand-muted border-brand-primary/40 hover:border-brand-accent hover:text-brand-text backdrop-blur-sm"
        }`}
      >
        All
      </button>

      {/* Dynamic Categories */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.name)}
          className={`px-5 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
            activeCategory === cat.name
              ? "bg-brand-accent text-[#F2F0EB] border-brand-accent shadow-lg scale-105"
              : "bg-transparent text-brand-muted border-brand-primary/40 hover:border-brand-accent hover:text-brand-text backdrop-blur-sm"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;