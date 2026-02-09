import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import uploadToCloudinary from '../utils/uploadCloudinary'; 
import { Plus, Trash2, Edit2, UploadCloud, Loader, Star, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  // --- MULTI-IMAGE STATES ---
  const [images, setImages] = useState([]); 
  const [previews, setPreviews] = useState([]); 

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previews.length > 4) {
      return alert("Bhai, sirf 4 photos allow hain!");
    }
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...files]);
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviews(previews.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const reset = () => {
    setIsEditing(false); setName(""); setPrice(""); setCategory(""); 
    setDescription(""); setImages([]); setPreviews([]); setFeatured(false);
    setEditId(null); setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return alert("Select Category first!");
    if (previews.length === 0) return alert("At least 1 photo zaroori hai!");
    setLoading(true);

    try {
      const uploadPromises = images.map(file => uploadToCloudinary(file));
      const newUrls = await Promise.all(uploadPromises);
      const existingUrls = previews.filter(p => p.startsWith('http'));
      const finalImageUrls = [...existingUrls, ...newUrls];

      const productData = {
        name,
        price: Number(price),
        category,
        description,
        imageUrls: finalImageUrls, 
        featured,
        updatedAt: new Date()
      };

      if (isEditing) {
        await updateDoc(doc(db, "products", editId), productData);
        alert("✅ Drop Updated!");
      } else {
        await addDoc(collection(db, "products"), { ...productData, createdAt: new Date() });
        alert("🚀 Product Launched!");
      }
      reset();
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-10">
      {/* --- FORM SECTION (Organic Card) --- */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-2 gap-8 bg-brand-primary/10 p-4 md:p-8 rounded-[2.5rem] border border-brand-primary/30 shadow-inner">
        
        {/* Left Side: Inputs */}
        <div className="space-y-4">
          <input type="text" placeholder="Product Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-4 rounded-xl md:rounded-2xl border border-brand-primary/20 bg-white/80 font-bold text-sm text-brand-text outline-none focus:border-brand-accent placeholder-brand-primary" required />
          
          <div className="flex flex-row gap-3">
            <input type="number" placeholder="Price (₹)" value={price} onChange={e=>setPrice(e.target.value)} className="w-1/2 p-4 rounded-xl md:rounded-2xl border border-brand-primary/20 bg-white/80 font-bold text-sm text-brand-text outline-none focus:border-brand-accent placeholder-brand-primary" required />
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-1/2 p-4 rounded-xl md:rounded-2xl border border-brand-primary/20 bg-white/80 font-bold text-xs md:text-sm text-brand-text outline-none focus:border-brand-accent" required>
              <option value="">Category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-4 rounded-xl md:rounded-2xl border border-brand-primary/20 bg-white/80 h-24 md:h-32 resize-none text-sm text-brand-text outline-none focus:border-brand-accent placeholder-brand-primary" />
          
          <div className="flex items-center gap-3 p-2 cursor-pointer active:scale-95 transition-all" onClick={() => setFeatured(!featured)}>
             <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl border-2 flex items-center justify-center transition-all ${featured ? 'bg-brand-accent border-brand-accent text-[#F2F0EB]' : 'bg-white border-brand-primary/30'}`}>
                <Star size={14} fill={featured ? "#F2F0EB" : "none"} className={featured ? "" : "text-brand-primary"} />
             </div>
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-muted">Featured on Home</span>
          </div>
        </div>

        {/* Right Side: Multi-Image Section */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary ml-1">Product Images (Max 4)</p>
          
          <div className="grid grid-cols-2 gap-3 min-h-[200px] md:min-h-[280px]">
            {/* Display Previews */}
            {previews.map((src, index) => (
              <div key={index} className="relative group rounded-2xl overflow-hidden border-2 border-[#F2F0EB] bg-white aspect-square shadow-sm">
                <img src={src} className="w-full h-full object-cover" alt="preview" />
                <button 
                  type="button" 
                  onClick={() => removeImage(index)} 
                  className="absolute top-2 right-2 bg-brand-accent text-[#F2F0EB] p-1.5 rounded-full shadow-lg active:scale-75 transition-transform"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {/* Add Photo Button */}
            {previews.length < 4 && (
              <label className="border-2 border-dashed border-brand-primary/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white/40 hover:border-brand-accent hover:bg-white transition-all aspect-square group">
                <div className="bg-brand-bg p-3 rounded-full group-hover:bg-brand-accent group-hover:text-white transition-colors text-brand-accent">
                  <Plus size={20} />
                </div>
                <span className="text-[8px] font-black uppercase mt-2 text-brand-primary group-hover:text-brand-accent tracking-widest">Add Photo</span>
                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}

            {previews.length === 0 && (
              <div className="border-2 border-dashed border-brand-primary/20 rounded-2xl flex items-center justify-center bg-brand-primary/5 aspect-square">
                <UploadCloud size={20} className="text-brand-primary/50" />
              </div>
            )}
          </div>
           
           <button type="submit" disabled={loading} className="bg-brand-accent text-[#F2F0EB] p-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-warm active:scale-95 transition-all hover:bg-brand-text">
             {loading ? <div className="flex items-center justify-center gap-2"><Loader className="animate-spin" size={16} /> SYNCING...</div> : (isEditing ? "Update Drop" : "Launch Product")}
           </button>
           {isEditing && <button type="button" onClick={reset} className="text-[10px] font-bold uppercase text-brand-muted text-center hover:text-brand-accent">Cancel Edit</button>}
        </div>
      </form>

      {/* --- LIST SECTION --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-brand-bg/60 backdrop-blur-sm border border-brand-primary/30 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-warm transition-all">
            <img src={p.imageUrls?.[0]} className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl object-cover border border-brand-primary/20" alt="" />
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-brand-text truncate uppercase text-[10px] md:text-xs tracking-tight">{p.name}</h4>
              <p className="font-black text-brand-primary text-[9px] md:text-[10px] italic">₹{p.price}</p>
            </div>
            <div className="flex gap-1 md:gap-2">
              <button onClick={() => { 
                setIsEditing(true); setEditId(p.id); setName(p.name); setPrice(p.price); setCategory(p.category); 
                setDescription(p.description); setPreviews(p.imageUrls || []); setFeatured(p.featured); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} className="p-2 md:p-3 bg-brand-primary/10 text-brand-muted rounded-lg md:rounded-xl hover:bg-brand-primary/30"><Edit2 size={14}/></button>
              <button onClick={async () => { if(window.confirm("Delete Product?")) await deleteDoc(doc(db, "products", p.id)) }} className="p-2 md:p-3 bg-red-50 text-red-400 rounded-lg md:rounded-xl hover:bg-red-100"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;