import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
  
  const displayImage = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls[0] 
    : product.imageUrl;

  const message = `Hello Aevora! I'm interested in: ${product.name} (Price: ₹${product.price})`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group relative block h-full p-[2px]"> 
      {/* Organic Glass Effect Card */}
      <div className="h-full p-4 md:p-5 rounded-[2.5rem] transition-all duration-500 ease-out 
                      bg-brand-bg/60 backdrop-blur-xl border border-brand-primary/40 shadow-sm
                      hover:shadow-warm group-hover:-translate-y-3 group-hover:bg-brand-bg/80
                      flex flex-col relative overflow-hidden">
        
        {/* Glow Decorator */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full group-hover:bg-brand-primary/30 transition-colors"></div>

        <Link to={`/product/${product.id}`}>
          <div className="aspect-square rounded-3xl bg-white/40 overflow-hidden mb-5 relative border border-brand-primary/20 shadow-inner">
            <img 
              src={displayImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
            />
            
            {/* Price Tag - Coffee Brown */}
            <div className="absolute top-3 right-3 bg-brand-accent/90 backdrop-blur-md text-[#F2F0EB] px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-wider border border-[#F2F0EB]/20 shadow-lg">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="mt-auto px-1 z-10">
          <p className="text-[9px] md:text-[10px] text-brand-primary font-black uppercase tracking-[0.2em] mb-1">
            {product.category}
          </p>
          <h3 className="text-sm md:text-xl font-black text-brand-text uppercase tracking-tighter leading-tight truncate mb-4">
            {product.name}
          </h3>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-2xl bg-brand-accent text-[#F2F0EB] text-[10px] font-black uppercase tracking-[0.15em] hover:bg-brand-text transition-all text-center shadow-lg active:scale-95 border border-brand-primary/20"
          >
            Get it now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;