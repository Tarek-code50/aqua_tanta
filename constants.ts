import { Dictionary, Product, Order, Technician, SiteSettings } from './types';

export const WHATSAPP_NUMBER = '201012902182';

export const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    whatsappNumber: '201012902182',
    facebookLink: '#',
    hotline: '19XXX',
  },
  hero: {
    titleAr: 'مياه نقية لعائلتك في طنطا',
    titleEn: 'Pure Water for Tanta Families',
    subtitleAr: 'أفضل حلول تنقية المياه بضمان شامل وخدمة ما بعد البيع متميزة.',
    subtitleEn:
      'Top-tier water purification solutions with comprehensive warranty and excellent after-sales service.',
    announcement: 'خصم 10% لفترة محدودة',
  },
  config: {
    maintenanceMode: false,
    deliveryFee: 50,
  },
};

export const TRANSLATIONS: Record<'ar' | 'en', Dictionary> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'منتجاتنا',
      maintenance: 'الصيانة',
      about: 'عن الشركة',
      contact: 'اتصل بنا',
      admin: 'الإدارة',
      login: 'دخول',
    },
    hero: {
      title: 'مياه نقية لعائلتك في طنطا',
      subtitle: 'أفضل حلول تنقية المياه بضمان شامل وخدمة ما بعد البيع متميزة.',
      cta: 'اطلب عبر واتساب',
    },
    features: {
      installation: 'تركيب مجاني',
      warranty: 'ضمان لمدة عام',
      parts: 'قطع غيار أصلية',
    },
    products: {
      title: 'أحدث فلاتر المياه',
      buyNow: 'شراء الآن',
      currency: 'ج.م',
    },
    maintenance: {
      title: 'حجز موعد صيانة',
      subtitle: 'تواجه مشكلة؟ أو حان وقت تغيير الشمعات؟ نحن هنا للمساعدة.',
      nameLabel: 'الاسم بالكامل',
      addressLabel: 'العنوان (المنطقة في طنطا)',
      issueLabel: 'وصف المشكلة',
      lastChangeLabel: 'تاريخ آخر تغيير للشمعات',
      submit: 'إرسال الطلب',
      reminder: 'تذكير الصيانة الذكي',
      reminderBtn: 'ذكرني بموعد الصيانة',
    },
    savings: {
      title: 'احسب توفيرك',
      question: 'كم زجاجة مياه تشتري أسبوعياً؟',
      calculate: 'احسب التوفير',
      result: 'يمكنك توفير حوالي',
      perYear: 'سنوياً باستخدام فلتر أكوا طنطا!',
    },
    comparison: {
      title: 'شاهد الفرق بنفسك',
      before: 'شمعة مستعملة',
      after: 'شمعة جديدة',
    },
    footer: {
      copyright: 'جميع الحقوق محفوظة © أكوا طنطا',
      location: 'طنطا، محافظة الغربية، مصر',
    },
    stats: {
      families: 'أسرة سعيدة',
      satisfaction: '١٠٠٪ رضاء تام',
      response: 'سرعة استجابة',
    },
    faq: {
      title: 'أسئلة شائعة',
      q1: 'كم سرعة التركيب؟',
      a1: 'عادة خلال 24-48 ساعة من طلبك. فنيونا محليون في طنطا.',
      q2: 'هل أحتاج للدفع مقدماً؟',
      a2: 'لا، الدفع عند الاستلام والتركيب الناجح لضمان رضاكم.',
      q3: 'ما هي فترة الضمان؟',
      a3: 'نقدم ضمان شامل لمدة عام على جميع القطع الميكانيكية.',
      q4: 'كم مرة يجب تغيير الفلاتر؟',
      a4: 'المرحلة 1: 3 شهور، المراحل 2-3: 6 شهور، الممبرين: 1-2 سنة حسب الاستخدام.',
    },
    admin: {
      login: {
        title: 'تسجيل دخول المشرف',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        submit: 'دخول آمن',
        error: 'بيانات الدخول غير صحيحة',
      },
      sidebar: {
        overview: 'نظرة عامة',
        products: 'المنتجات والمخزون',
        orders: 'سجل الطلبات',
        technicians: 'الفنيين',
        users: 'إدارة الموظفين',
        settings: 'الإعدادات',
        logout: 'تسجيل خروج',
      },
      overview: {
        totalRevenue: 'إجمالي المبيعات',
        leads: 'عملاء واتساب',
        lowStock: 'تنبيهات المخزون',
      },
      common: {
        edit: 'تعديل',
        save: 'حفظ',
        cancel: 'إلغاء',
        delete: 'حذف',
        add: 'إضافة منتج',
        status: 'الحالة',
        actions: 'إجراءات',
      },
      settings: {
        contactInfo: 'بيانات التواصل',
        heroSection: 'واجهة الصفحة الرئيسية',
        serviceControl: 'التحكم في الخدمة',
        success: 'تم حفظ الإعدادات بنجاح',
      },
      users: {
        title: 'إدارة الموظفين والصلاحيات',
        addWorker: 'إضافة فني جديد',
        name: 'الاسم',
        email: 'البريد',
        role: 'الصلاحية',
        createSuccess: 'تم إنشاء حساب الموظف بنجاح',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      maintenance: 'Maintenance',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin',
      login: 'Login',
    },
    hero: {
      title: 'Pure Water for Tanta Families',
      subtitle:
        'Top-tier water purification solutions with comprehensive warranty and excellent after-sales service.',
      cta: 'Order via WhatsApp',
    },
    features: {
      installation: 'Free Installation',
      warranty: '1-Year Warranty',
      parts: 'Genuine Parts',
    },
    products: {
      title: 'Latest Water Filters',
      buyNow: 'Buy Now',
      currency: 'EGP',
    },
    maintenance: {
      title: 'Book Maintenance',
      subtitle: 'Facing an issue? Or time to change filters? We are here to help.',
      nameLabel: 'Full Name',
      addressLabel: 'Address (District in Tanta)',
      issueLabel: 'Issue Description',
      lastChangeLabel: 'Last Filter Change Date',
      submit: 'Send Request',
      reminder: 'Smart Maintenance Reminder',
      reminderBtn: 'Remind me via WhatsApp',
    },
    savings: {
      title: 'Calculate Your Savings',
      question: 'How many water bottles do you buy per week?',
      calculate: 'Calculate',
      result: 'You could save around',
      perYear: 'per year using Aqua Tanta filter!',
    },
    comparison: {
      title: 'See the Difference',
      before: 'Used Filter',
      after: 'New Filter',
    },
    footer: {
      copyright: 'All rights reserved © Aqua Tanta',
      location: 'Tanta, Gharbia Governorate, Egypt',
    },
    stats: {
      families: 'Happy Families',
      satisfaction: '100% Satisfaction',
      response: 'Response Time',
    },
    faq: {
      title: 'Common Inquiries',
      q1: 'How fast is the installation?',
      a1: 'Usually within 24-48 hours of your order. Our technicians are local to Tanta.',
      q2: 'Do I need to pay upfront?',
      a2: 'No, payment is upon delivery and successful installation to ensure your satisfaction.',
      q3: 'What is the warranty period?',
      a3: 'We offer a comprehensive 1-year warranty on all mechanical parts and labor.',
      q4: 'How often should I change filters?',
      a4: 'Stage 1: 3 months, Stages 2-3: 6 months, Membrane: 1-2 years depending on usage.',
    },
    admin: {
      login: {
        title: 'Admin Login',
        email: 'Email',
        password: 'Password',
        submit: 'Secure Login',
        error: 'Invalid email or password',
      },
      sidebar: {
        overview: 'Overview',
        products: 'Products & Stock',
        orders: 'Orders Log',
        technicians: 'Technicians',
        users: 'Staff Management',
        settings: 'Settings',
        logout: 'Logout',
      },
      overview: {
        totalRevenue: 'Total Revenue',
        leads: 'WhatsApp Leads',
        lowStock: 'Low Stock Alerts',
      },
      common: {
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        add: 'Add Product',
        status: 'Status',
        actions: 'Actions',
      },
      settings: {
        contactInfo: 'Contact Information',
        heroSection: 'Homepage Hero',
        serviceControl: 'Service Control',
        success: 'Settings saved successfully',
      },
      users: {
        title: 'Staff & Role Management',
        addWorker: 'Add New Technician',
        name: 'Name',
        email: 'Email',
        role: 'Role',
        createSuccess: 'Worker account created successfully',
      },
    },
  },
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: { ar: 'فلتر 7 مراحل تايواني', en: '7-Stage Taiwanese Filter' },
    price: 3500,
    description: {
      ar: 'تنقية كاملة مع وحدة معالجة وحوحدة أملاح.',
      en: 'Complete purification with processing unit and mineralizer.',
    },
    image: 'https://picsum.photos/400/400?random=1',
    category: 'filter',
    stock: 12,
  },
  {
    id: 'p2',
    name: { ar: 'فلتر 5 مراحل', en: '5-Stage Filter' },
    price: 1200,
    description: {
      ar: 'الحل الاقتصادي لمياه نقية خالية من الشوائب.',
      en: 'The economical solution for pure water free of impurities.',
    },
    image: 'https://picsum.photos/400/400?random=2',
    category: 'filter',
    stock: 5,
  },
  {
    id: 'p3',
    name: { ar: 'طقم شمعات (3 قطع)', en: 'Filter Cartridges Set (3 pcs)' },
    price: 150,
    description: {
      ar: 'طقم شمعات المرحلة الأولى والثانية والثالثة.',
      en: 'Set of 1st, 2nd, and 3rd stage cartridges.',
    },
    image: 'https://picsum.photos/400/400?random=3',
    category: 'spare',
    stock: 100,
  },
  {
    id: 'p4',
    name: { ar: 'خزان فلتر تايواني', en: 'Taiwanese Filter Tank' },
    price: 800,
    description: { ar: 'خزان سعة 12 لتر عالي الجودة.', en: 'High quality 12-liter tank.' },
    image: 'https://picsum.photos/400/400?random=4',
    category: 'spare',
    stock: 2, // Low stock
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '101',
    customerName: 'Ahmed Ali',
    phone: '01012345678',
    date: '2023-10-25',
    status: 'new',
    total: 3500,
    items: '7-Stage Filter',
  },
  {
    id: '102',
    customerName: 'Sara Mahmoud',
    phone: '01234567890',
    date: '2023-10-24',
    status: 'completed',
    total: 150,
    items: 'Cartridges Set',
  },
  {
    id: '103',
    customerName: 'Mohamed Sami',
    phone: '01112223334',
    date: '2023-10-24',
    status: 'assigned',
    total: 1200,
    items: 'Maintenance',
  },
  {
    id: '104',
    customerName: 'Hoda Ezzat',
    phone: '01555666777',
    date: '2023-10-23',
    status: 'cancelled',
    total: 0,
    items: 'Inquiry',
  },
];

export const MOCK_TECHNICIANS: Technician[] = [
  { id: 't1', name: 'Hassan Fathy', phone: '0100000001', status: 'active', tasksToday: 3 },
  { id: 't2', name: 'Ibrahim Khalil', phone: '0100000002', status: 'busy', tasksToday: 5 },
  { id: 't3', name: 'Mostafa Kamel', phone: '0100000003', status: 'offline', tasksToday: 0 },
];
