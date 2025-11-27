import { WHATSAPP_NUMBER } from '../constants';

// Accepts optional phoneNumber, defaults to constant if not provided (though call sites should provide dynamic)
export const generateWhatsAppLink = (
  message: string,
  phoneNumber: string = WHATSAPP_NUMBER
): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const generateProductInquiry = (productName: string, price: string): string => {
  return `مرحباً أكوا طنطا 👋\nأنا مهتم بشراء: ${productName}\nالسعر المعروض: ${price}\nهل المنتج متاح؟`;
};

export const generateMaintenanceRequest = (
  name: string,
  address: string,
  issue: string
): string => {
  return `مرحباً، أحتاج صيانة 🛠\nالاسم: ${name}\nالعنوان: ${address}\nالمشكلة: ${issue}`;
};

export const generateMaintenanceReminder = (date: string): string => {
  return `مرحباً، آخر موعد تغيير شمعات كان ${date}. من فضلك ذكرني بموعد الصيانة القادم.`;
};
