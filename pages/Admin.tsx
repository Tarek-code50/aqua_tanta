import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_ORDERS, MOCK_TECHNICIANS } from '../constants';
import { Product, SiteSettings, UserProfile } from '../types';
import Login from './Login'; // Import Login component if redirect fails

// --- Icons (SVG) ---
const Icons = {
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3"/><rect width="7" height="5" x="14" y="3"/><rect width="7" height="9" x="14" y="12"/><rect width="7" height="5" x="3" y="16"/></svg>,
  Package: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22v-9"/></svg>,
  Cart: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  Alert: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
};

// --- Reusable UI Components (Admin Styled) ---
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">{title}</h3>}
    {children}
  </div>
);

const Badge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200',
    assigned: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-200',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200',
    active: 'bg-green-100 text-green-700',
    busy: 'bg-orange-100 text-orange-700',
    offline: 'bg-slate-100 text-slate-700',
    // Roles
    admin: 'bg-purple-100 text-purple-700',
    worker: 'bg-blue-100 text-blue-700',
    customer: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

// --- Product Modal ---
const ProductModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  product: Product | null; 
  onSave: (product: Product) => void 
}> = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: { ar: '', en: '' },
    price: 0,
    description: { ar: '', en: '' },
    image: '',
    category: 'filter',
    stock: 10
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: { ar: '', en: '' },
        price: 0,
        description: { ar: '', en: '' },
        image: 'https://picsum.photos/400/400?random=' + Date.now(),
        category: 'filter',
        stock: 10
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name (Arabic)</label>
              <input 
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                value={formData.name.ar}
                onChange={e => setFormData({...formData, name: {...formData.name, ar: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name (English)</label>
              <input 
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                value={formData.name.en}
                onChange={e => setFormData({...formData, name: {...formData.name, en: e.target.value}})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input 
                type="number"
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input 
                type="number"
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium mb-1">Category</label>
             <select 
               className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
               value={formData.category}
               onChange={e => setFormData({...formData, category: e.target.value})}
             >
               <option value="filter">Filter</option>
               <option value="spare">Spare Parts</option>
             </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input 
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
            />
          </div>

           <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (Arabic)</label>
              <textarea 
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 h-24"
                value={formData.description.ar}
                onChange={e => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (English)</label>
              <textarea 
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 h-24"
                value={formData.description.en}
                onChange={e => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-4 py-2 rounded bg-brand-600 text-white hover:bg-brand-700">Save Product</button>
        </div>
      </div>
    </div>
  );
};


// --- Sub-Views ---

const Overview: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.admin.overview.totalRevenue}</p>
              <h4 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">45,200 {t.products.currency}</h4>
            </div>
            <div className="bg-brand-100 dark:bg-brand-900 p-3 rounded-lg text-brand-600 dark:text-brand-300">
               <Icons.Dashboard />
            </div>
          </div>
          <p className="text-xs text-green-500 mt-4 flex items-center font-medium">
             <Icons.Check /> +12% from last month
          </p>
        </Card>
        
        <Card>
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.admin.overview.leads}</p>
              <h4 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">128</h4>
            </div>
             <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg text-green-600 dark:text-green-300">
               <Icons.Cart />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">Clicks on 'Buy Now'</p>
        </Card>

        <Card>
           <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.admin.overview.lowStock}</p>
              <h4 className="text-3xl font-bold text-red-600 mt-2">1</h4>
            </div>
             <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg text-red-600 dark:text-red-300">
               <Icons.Alert />
            </div>
          </div>
          <p className="text-xs text-red-500 mt-4 font-medium">Attention required</p>
        </Card>
      </div>
    </div>
  );
};

const ProductsManager: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(product.id, product);
    } else {
      addProduct(product);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t.admin.sidebar.products}</h2>
        <button onClick={handleAddNew} className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 flex items-center gap-2">
          <span>+</span> {t.admin.common.add}
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3">{t.nav.products}</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                    <img src={product.image} alt="" className="w-8 h-8 rounded object-cover" />
                    {product.name[language]}
                  </td>
                  <td className="px-6 py-4">{product.price} {t.products.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${product.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.stock} Units
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800" title={t.admin.common.edit}>
                      <Icons.Edit />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800" title={t.admin.common.delete}>
                      <Icons.Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct}
        onSave={handleSave}
      />
    </>
  );
};

// --- Worker Management Module ---
const UserManager: React.FC = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<UserProfile[]>([
    { id: 'u1', full_name: 'Ahmed Technician', email: 'ahmed@aqua.com', role: 'worker' },
    { id: 'u2', full_name: 'Gamal Admin', email: 'gamal@gmail.com', role: 'admin' },
  ]); // Mock state for demo, would fetch from Supabase in real app

  const [newWorker, setNewWorker] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleCreateWorker = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate creation
    setUsers([...users, { id: `u${Date.now()}`, full_name: newWorker.name, email: newWorker.email, role: 'worker' }]);
    setMsg(t.admin.users.createSuccess);
    setNewWorker({ name: '', email: '', password: '' });
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="space-y-8">
      {msg && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{msg}</div>
      )}
      
      {/* Create User Form */}
      <Card title={t.admin.users.addWorker}>
        <form onSubmit={handleCreateWorker} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">{t.admin.users.name}</label>
            <input 
              required
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              value={newWorker.name}
              onChange={e => setNewWorker({...newWorker, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t.admin.users.email}</label>
            <input 
              required
              type="email"
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              value={newWorker.email}
              onChange={e => setNewWorker({...newWorker, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              required
              type="password"
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              value={newWorker.password}
              onChange={e => setNewWorker({...newWorker, password: e.target.value})}
            />
          </div>
          <button className="bg-brand-600 text-white px-4 py-2 rounded h-10 hover:bg-brand-700 font-bold">
            Create Account
          </button>
        </form>
      </Card>

      {/* User List */}
      <Card title="Staff Directory">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
             <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
               <tr>
                 <th className="px-6 py-3">{t.admin.users.name}</th>
                 <th className="px-6 py-3">{t.admin.users.email}</th>
                 <th className="px-6 py-3">{t.admin.users.role}</th>
                 <th className="px-6 py-3">Action</th>
               </tr>
             </thead>
             <tbody>
               {users.map(u => (
                 <tr key={u.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                   <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{u.full_name}</td>
                   <td className="px-6 py-4">{u.email}</td>
                   <td className="px-6 py-4"><Badge status={u.role} /></td>
                   <td className="px-6 py-4 text-red-600 cursor-pointer hover:underline">
                      {u.role !== 'admin' && 'Delete'}
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const SettingsManager: React.FC = () => {
  const { settings, updateSettings } = useData();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [message, setMessage] = useState('');

  // Sync with context if it changes externally, though mostly it won't here
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (section: keyof SiteSettings, key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    updateSettings(formData);
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-8">
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in">
          {message}
        </div>
      )}

      {/* Contact Info */}
      <Card title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
            <input 
              type="text" 
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              value={formData.contact.whatsappNumber}
              onChange={(e) => handleChange('contact', 'whatsappNumber', e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">Controls all "Buy" buttons</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Facebook Link</label>
            <input 
              type="text" 
              className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
              value={formData.contact.facebookLink}
              onChange={(e) => handleChange('contact', 'facebookLink', e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Hero Section */}
      <Card title="Homepage Hero">
        <div className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium mb-1">Title (Arabic)</label>
                <input 
                  type="text" 
                  className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                  value={formData.hero.titleAr}
                  onChange={(e) => handleChange('hero', 'titleAr', e.target.value)}
                />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1">Title (English)</label>
                <input 
                  type="text" 
                  className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                  value={formData.hero.titleEn}
                  onChange={(e) => handleChange('hero', 'titleEn', e.target.value)}
                />
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium mb-1">Subtitle (Arabic)</label>
                <textarea 
                  className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                  value={formData.hero.subtitleAr}
                  onChange={(e) => handleChange('hero', 'subtitleAr', e.target.value)}
                />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1">Subtitle (English)</label>
                <textarea 
                  className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                  value={formData.hero.subtitleEn}
                  onChange={(e) => handleChange('hero', 'subtitleEn', e.target.value)}
                />
             </div>
           </div>

           <div>
              <label className="block text-sm font-medium mb-1">Announcement Bar Text</label>
              <input 
                type="text" 
                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600"
                value={formData.hero.announcement}
                onChange={(e) => handleChange('hero', 'announcement', e.target.value)}
              />
           </div>
        </div>
      </Card>

      {/* Configuration */}
      <Card title="Service Control">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              checked={formData.config.maintenanceMode}
              onChange={(e) => handleChange('config', 'maintenanceMode', e.target.checked)}
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Maintenance Mode (Close Site)</span>
          </label>
        </div>
      </Card>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 shadow-lg transform active:scale-95 transition-all"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

const OrdersLedger: React.FC = () => {
  const { t } = useLanguage();
  return (
    <Card title={t.admin.sidebar.orders}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 dark:text-white">{order.customerName}</div>
                  <div className="text-xs">{order.phone}</div>
                </td>
                <td className="px-6 py-4">{order.items}</td>
                <td className="px-6 py-4"><Badge status={order.status} /></td>
                <td className="px-6 py-4 font-bold">{order.total} EGP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const TechniciansList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_TECHNICIANS.map((tech) => (
        <Card key={tech.id} className="text-center">
          <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-300 mb-4">
            {tech.name.charAt(0)}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tech.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{tech.phone}</p>
          <div className="flex justify-center gap-2 mb-4">
            <Badge status={tech.status} />
          </div>
          <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between text-sm">
            <span className="text-slate-500">Tasks Today:</span>
            <span className="font-bold text-slate-900 dark:text-white">{tech.tasksToday}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

// --- Main Layout & Auth ---

const Admin: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, loading, signOut } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'technicians' | 'users' | 'settings'>('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Authentication Guard
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-brand-600">Loading...</div>;
  }

  if (!user || (profile?.role !== 'admin' && profile?.role !== 'worker')) {
    // If not logged in or authorized, show Login component
    return <Login />;
  }

  // Sidebar Items (Filtered based on role)
  const menuItems = [
    { id: 'overview', label: t.admin.sidebar.overview, icon: Icons.Dashboard },
    { id: 'products', label: t.admin.sidebar.products, icon: Icons.Package },
    { id: 'orders', label: t.admin.sidebar.orders, icon: Icons.Cart },
    { id: 'technicians', label: t.admin.sidebar.technicians, icon: Icons.Users },
    // Only Admin sees Users and Settings
    ...(profile.role === 'admin' ? [
      { id: 'users', label: t.admin.sidebar.users, icon: Icons.Users },
      { id: 'settings', label: t.admin.sidebar.settings, icon: Icons.Settings }
    ] : [])
  ];

  const handleLogout = async () => {
    await signOut();
    window.location.hash = 'home';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex text-slate-800 dark:text-slate-100 transition-colors">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col fixed h-full z-20 rtl:border-l rtl:border-r-0`}>
        <div className="h-20 flex items-center justify-center border-b border-slate-100 dark:border-slate-700">
           {isSidebarOpen ? (
             <span className="font-bold text-xl text-brand-600">Aqua Admin</span>
           ) : (
             <span className="font-bold text-xl text-brand-600">A</span>
           )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-400 font-medium' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              <item.icon />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <div className="mb-4 px-3 text-xs text-slate-500">
             {profile.email} <br/>
             <Badge status={profile.role} />
          </div>
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 mb-2"
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            {isSidebarOpen && <span>Mode</span>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Icons.LogOut />
            {isSidebarOpen && <span>{t.admin.sidebar.logout}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64 rtl:ml-0 rtl:mr-64' : 'ml-20 rtl:ml-0 rtl:mr-20'}`}>
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-500 hover:text-brand-600">
            <Icons.Menu />
          </button>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium">Welcome, {profile.full_name || 'Admin'}</span>
             <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
                {profile.full_name ? profile.full_name.charAt(0) : 'A'}
             </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your business stats and resources.</p>
          </div>

          <div className="animate-fade-in">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'products' && <ProductsManager />}
            {activeTab === 'orders' && <OrdersLedger />}
            {activeTab === 'technicians' && <TechniciansList />}
            {activeTab === 'users' && profile.role === 'admin' && <UserManager />}
            {activeTab === 'settings' && profile.role === 'admin' && <SettingsManager />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
