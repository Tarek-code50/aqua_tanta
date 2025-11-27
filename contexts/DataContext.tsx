import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SiteSettings } from '../types';
import { INITIAL_PRODUCTS, DEFAULT_SETTINGS } from '../constants';

interface DataContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('products');
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    }
    return INITIAL_PRODUCTS;
  });

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('siteSettings');
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    }
    return DEFAULT_SETTINGS;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  // Actions
  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  return (
    <DataContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, settings, updateSettings }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
