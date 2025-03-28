export const isEmpty = (value) => {
  return value === null || value === undefined || value.trim() === '';
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  // Türkiye telefon numarası formatı kontrolü (+90XXXXXXXXXX veya 0XXXXXXXXXX)
  // Boşluklar, parantezler ve tire işaretlerini kabul eder, bunları temizleyip kontrol eder
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  
  // Türkiye telefon formatı kontrolü: 
  // 1. +90 ile başlayıp 10 rakam
  // 2. 0 ile başlayıp 10 rakam 
  // 3. Sadece 10 rakam (5XXXXXXXXX formatı)
  const phoneRegex = /^(\+90|0)?(5\d{9})$/;
  return phoneRegex.test(cleanPhone);
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Boşluklar, parantezler ve tire işaretlerini temizle
  let cleanPhone = phone.replace(/[\s()-]/g, '');
  
  // +90 veya 0 ile başlıyorsa kaldır
  if (cleanPhone.startsWith('+90')) {
    cleanPhone = cleanPhone.substring(3);
  } else if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }
  
  // Eğer telefon 10 haneli değilse (5XXXXXXXXX formatında değilse) olduğu gibi döndür
  if (!/^5\d{9}$/.test(cleanPhone)) {
    return phone;
  }
  
  // 5XXXXXXXXX formatını +90 5XX XXX XX XX formatına dönüştür
  return `+(90) ${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6, 8)} ${cleanPhone.substring(8, 10)}`;
};

export const isValidDate = (date) => {
  if (isEmpty(date)) return false;
  
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};

export const isValidBirthDate = (birthDate) => {
  if (!isValidDate(birthDate)) return false;
  
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  const age = today.getFullYear() - birthDateObj.getFullYear();
  
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  const dayDiff = today.getDate() - birthDateObj.getDate();
  
  const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
  const actualAge = isBirthdayPassed ? age : age - 1;
  
  return actualAge >= 18;
};

export const isValidEmploymentDate = (employmentDate) => {
  if (!isValidDate(employmentDate)) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const employmentDateObj = new Date(employmentDate);
  
  return employmentDateObj <= today;
};
