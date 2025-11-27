export type Language = 'ar' | 'en';
export type UserRole = 'admin' | 'worker' | 'customer';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
}

export interface Product {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  price: number;
  description: {
    ar: string;
    en: string;
  };
  image: string;
  category: string;
  stock: number;
}

export interface SiteSettings {
  contact: {
    whatsappNumber: string;
    facebookLink: string;
    hotline: string;
  };
  hero: {
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    announcement: string;
  };
  config: {
    maintenanceMode: boolean;
    deliveryFee: number;
  };
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  status: 'new' | 'assigned' | 'completed' | 'cancelled';
  total: number;
  items: string;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  status: 'active' | 'busy' | 'offline';
  tasksToday: number;
}

export interface Dictionary {
  nav: {
    home: string;
    products: string;
    maintenance: string;
    about: string;
    contact: string;
    admin: string;
    login: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: {
    installation: string;
    warranty: string;
    parts: string;
  };
  products: {
    title: string;
    buyNow: string;
    currency: string;
  };
  maintenance: {
    title: string;
    subtitle: string;
    nameLabel: string;
    addressLabel: string;
    issueLabel: string;
    lastChangeLabel: string;
    submit: string;
    reminder: string;
    reminderBtn: string;
  };
  savings: {
    title: string;
    question: string;
    calculate: string;
    result: string;
    perYear: string;
  };
  comparison: {
    title: string;
    before: string;
    after: string;
  };
  footer: {
    copyright: string;
    location: string;
  };
  stats: {
    families: string;
    satisfaction: string;
    response: string;
  };
  faq: {
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  admin: {
    login: {
      title: string;
      email: string;
      password: string;
      submit: string;
      error: string;
    };
    sidebar: {
      overview: string;
      products: string;
      orders: string;
      technicians: string;
      users: string;
      settings: string;
      logout: string;
    };
    overview: {
      totalRevenue: string;
      leads: string;
      lowStock: string;
    };
    common: {
      edit: string;
      save: string;
      cancel: string;
      delete: string;
      add: string;
      status: string;
      actions: string;
    };
    settings: {
      contactInfo: string;
      heroSection: string;
      serviceControl: string;
      success: string;
    };
    users: {
      title: string;
      addWorker: string;
      name: string;
      email: string;
      role: string;
      createSuccess: string;
    };
  };
}
