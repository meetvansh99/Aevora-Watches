import React from 'react';
import { Instagram, Phone, MapPin, Lock, MessageCircle } from 'lucide-react';

const Footer = ({ onOpenAdmin }) => {
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA";
  const instagram = import.meta.env.VITE_INSTAGRAM;
  const whatsapp = import.meta.env.VITE_WHATSAPP_NO;
  const phone = import.meta.env.VITE_PHONE;
  const locationName = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";
  const mapLink = import.meta.env.VITE_MAP_LINK;

  return (
    <footer className="mt-auto px-4 md:px-8 pb-8 relative overflow-hidden">
      {/* Organic Glass Card */}
      <div className="max-w-7xl mx-auto bg-brand-bg/60 backdrop-blur-xl border border-brand-primary/40 rounded-[3rem] p-8 md:p-12 shadow-warm relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-brand-text leading-none">
              {shopName}
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-muted mt-2 italic">Natural Elegance</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { link: instagram, icon: <Instagram size={20} /> },
              { link: whatsapp ? `https://wa.me/${whatsapp}` : null, icon: <MessageCircle size={20} /> },
              { link: phone ? `tel:${phone}` : null, icon: <Phone size={20} /> },
              { link: mapLink, icon: <MapPin size={20} /> }
            ].map((item, i) => item.link && (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-brand-primary/20 rounded-full text-brand-accent hover:bg-brand-accent hover:text-[#F2F0EB] transition-all border border-brand-primary/30 shadow-sm group active:scale-90">
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-primary/30 flex justify-between items-center text-brand-muted text-[10px] font-black uppercase tracking-widest">
           © {new Date().getFullYear()} {shopName}.
           <button onClick={onOpenAdmin} className="p-2 hover:text-brand-accent transition-colors"><Lock size={12}/></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;