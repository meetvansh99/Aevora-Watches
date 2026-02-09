import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, X, Check, Loader, LayoutGrid } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "categories"), { name: newCategory.trim() });
      setNewCategory(""); 
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try { await deleteDoc(doc(db, "categories", id)); } catch (error) { console.error(error); }
    }
  };

  const startEditing = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleUpdate = async () => {
    if (!editingName.trim()) return;
    try {
      await updateDoc(doc(db, "categories", editingId), { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
    } catch (error) { console.error(error); }
  };

  return (
    // Organic Container
    <div className="bg-brand-primary/10 p-4 md:p-8 rounded-[2.5rem] shadow-inner border border-brand-primary/30">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-brand-primary/20 pb-4">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-brand-accent text-[#F2F0EB] rounded-xl flex items-center justify-center shadow-md border border-[#F2F0EB]/20">
              <LayoutGrid size={20} />
           </div>
           <div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-brand-text">Manage Categories</h2>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mt-1">Organize your drops</p>
           </div>
           <span className="bg-brand-primary/20 text-brand-accent text-[10px] font-bold px-3 py-1 rounded-full border border-brand-primary/30">{categories.length}</span>
        </div>
      </div>

      {/* --- ADD FORM --- */}
      <form onSubmit={handleAdd} className="flex flex-row gap-3 mb-8">
        <input 
          type="text" 
          placeholder="New Category Name..." 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 min-w-0 bg-white/80 border border-brand-primary/20 rounded-2xl px-4 py-3 text-sm font-bold text-brand-text focus:outline-none focus:border-brand-accent transition-all placeholder-brand-primary/50 shadow-sm"
        />
        <button 
          type="submit" 
          disabled={loading || !newCategory}
          className="aspect-square sm:aspect-auto bg-brand-accent text-[#F2F0EB] p-3 sm:px-6 sm:py-3 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-text disabled:opacity-70 flex items-center justify-center gap-2 shadow-warm active:scale-95 transition-all"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Plus size={20} />}
          <span className="hidden sm:inline text-xs">Add</span>
        </button>
      </form>

      {/* --- LIST --- */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-brand-primary/50 text-center py-10 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-brand-primary/20 rounded-3xl">
            No Categories Yet
          </p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="group flex items-center justify-between p-3 md:p-4 bg-brand-bg/60 backdrop-blur-sm rounded-2xl border border-brand-primary/30 hover:bg-white hover:shadow-warm transition-all duration-300">
              
              {editingId === cat.id ? (
                // Edit Mode
                <div className="flex items-center gap-2 flex-1 animate-in fade-in zoom-in-95">
                  <input 
                    type="text" 
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 bg-white border border-brand-accent/50 rounded-xl px-3 py-2 text-sm font-bold text-brand-text outline-none shadow-sm"
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <button onClick={handleUpdate} className="p-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200"><Check size={16} /></button>
                    <button onClick={() => setEditingId(null)} className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"><X size={16} /></button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <span className="font-bold text-brand-text uppercase tracking-wide text-xs md:text-sm pl-2 border-l-2 border-brand-primary/50 truncate">
                    {cat.name}
                  </span>
                  <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEditing(cat)} className="p-2 text-brand-muted hover:bg-brand-primary/20 rounded-xl transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"><Trash2 size={16} /></button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;