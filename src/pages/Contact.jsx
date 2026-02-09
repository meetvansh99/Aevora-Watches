import React from 'react';
import { Instagram, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

const Contact = () => {
  const instagram = import.meta.env.VITE_INSTAGRAM || "#"; 
  const phone = import.meta.env.VITE_PHONE || "+91 00000 00000";
  const whatsapp = import.meta.env.VITE_WHATSAPP_NO;
  const locationName = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";
  const mapLink = import.meta.env.VITE_MAP_LINK; 

  const contactMethods = [
    { icon: <Phone size={24} />, title: "Call Us", value: phone, link: `tel:${phone}` },
    { icon: <MessageCircle size={24} />, title: "WhatsApp", value: "Chat with us", link: whatsapp ? `https://wa.me/${whatsapp}` : "#" },
    { icon: <Instagram size={24} />, title: "Instagram", value: "@aevora", link: instagram },
    { icon: <Clock size={24} />, title: "Working Hours", value: "10 AM - 8 PM", link: null }
  ];

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-muted mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-brand-text leading-none">
            Contact <span className="text-brand-primary">Studio</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="group p-8 rounded-[2.5rem] bg-brand-bg/60 backdrop-blur-md border border-brand-primary/40 shadow-warm transition-all duration-500 hover:-translate-y-2 hover:bg-brand-bg flex items-center gap-6">
              <div className="p-5 rounded-2xl bg-brand-accent text-[#F2F0EB] shadow-lg group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">{method.title}</p>
                {method.link ? (
                  <a href={method.link} target="_blank" rel="noopener noreferrer" className="text-xl font-black uppercase tracking-tighter text-brand-text hover:text-brand-accent transition-colors">
                    {method.value}
                  </a>
                ) : (
                  <p className="text-xl font-black uppercase tracking-tighter text-brand-text">{method.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-8 md:p-10 rounded-[3rem] bg-brand-bg/60 backdrop-blur-md border border-brand-primary/40 shadow-warm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-accent">
              <MapPin size={24} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-brand-muted">Our Location</p>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-brand-text">{locationName}</h2>
            </div>
          </div>
          
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-10 py-5 bg-brand-accent text-[#F2F0EB] rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-text transition-all active:scale-95 shadow-xl">
            <Send size={16} /> Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;