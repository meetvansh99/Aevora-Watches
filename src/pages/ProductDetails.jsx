import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Loader, ArrowLeft, MessageCircle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-brand-bg"><Loader className="animate-spin text-brand-accent" /></div>;
  if (!product) return <div className="min-h-screen flex justify-center items-center font-black uppercase text-brand-muted">Product Not Found</div>;

  const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  const nextImg = () => setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImg = () => setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const message = `*ORDER INQUIRY* 🔥\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}\n*Category:* ${product.category}\n*Image:* ${images[0]}\n\nHello Aevora! Is this item available?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-brand-bg relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-primary/20 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-brand-accent/5 blur-3xl rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-muted hover:text-brand-accent mb-10 transition-all">
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-brand-bg/60 backdrop-blur-xl border border-brand-primary/40 p-5 md:p-12 rounded-[3.5rem] shadow-warm">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square rounded-[2.5rem] bg-white/40 overflow-hidden relative border border-brand-primary/20 group">
              <img src={images[activeImg]} className="w-full h-full object-cover" alt="" />
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-accent/20 backdrop-blur-md p-2 rounded-full text-brand-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-white"><ChevronLeft size={20} /></button>
                  <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-accent/20 backdrop-blur-md p-2 rounded-full text-brand-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-white"><ChevronRight size={20} /></button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <div key={i} className={`h-1 transition-all rounded-full ${activeImg === i ? 'w-6 bg-brand-accent' : 'w-2 bg-brand-primary/50'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 justify-center py-2 overflow-x-auto">
              {images.map((img, i) => (
                <img key={i} src={img} onClick={() => setActiveImg(i)} className={`w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover cursor-pointer border-2 transition-all ${activeImg === i ? 'border-brand-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`} />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-3 block">{product.category}</span>
              <h1 className="text-4xl md:text-7xl font-black text-brand-text uppercase tracking-tighter leading-none mb-4">{product.name}</h1>
              <p className="text-2xl md:text-4xl font-black text-brand-accent italic">₹{product.price}</p>
            </div>
            <p className="text-brand-text text-sm font-medium leading-relaxed opacity-80">{product.description}</p>
            <div className="pt-6">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full py-6 rounded-[2rem] bg-brand-accent text-[#F2F0EB] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-brand-text active:scale-95 transition-all border border-brand-primary/20">
                <MessageCircle size={22} /> Buy on WhatsApp
              </a>
              <p className="mt-4 flex items-center justify-center gap-2 text-[9px] font-black text-brand-muted uppercase tracking-widest"><ShieldCheck size={12} /> Secure Ordering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;