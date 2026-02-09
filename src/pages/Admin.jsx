import React from 'react';

const Admin = () => {
  return (
    <div className="pt-40 px-4 text-center bg-brand-bg min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-black uppercase text-brand-text tracking-tighter">Admin Panel</h1>
      <p className="mt-4 text-brand-muted font-bold tracking-widest text-xs uppercase">Restricted Area. Authorized Access Only.</p>
    </div>
  );
};

export default Admin;